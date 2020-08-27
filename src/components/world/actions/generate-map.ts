import {
    MAP_DIMENSIONS,
    ROOM_COUNT,
    MAX_ROOM_DIMENSIONS,
    MIN_ROOM_DIMENSIONS,
    RANDOM_CONNECTIONS,
    SPURS,
} from "../../../constants";
import { Point, GameMap, Tile, Dimension } from "../../../types";

import { randBetween } from "../../../utils/rand_between";
import generateObjects from "./generate-objects";

type Room = Dimension & Point;

/**
 * Generate a map, initialising all tiles to a wall tile
 *
 * @param wallType The value used for a wall
 */
const createMapOfWalls = (wallType: number): GameMap => {
    const map = {
        tiles: Array.from({ length: MAP_DIMENSIONS.height }, (_, y) =>
            Array.from(
                { length: MAP_DIMENSIONS.width },
                (_, x): Tile => ({
                    location: { x, y },
                    explored: false,
                    value: wallType,
                    variation: 0,
                }),
            ),
        ),
        paddingTiles: { top: [], bottom: [], left: [], right: [] },
        id: "",
    };

    return map;
};

const generateRoom = (): Room => {
    const width = randBetween(MIN_ROOM_DIMENSIONS.width, MAX_ROOM_DIMENSIONS.width);
    const height = randBetween(MIN_ROOM_DIMENSIONS.height, MAX_ROOM_DIMENSIONS.height);

    const room = {
        x: Math.floor(Math.random() * (MAP_DIMENSIONS.width - width - 1)),
        y: Math.floor(Math.random() * (MAP_DIMENSIONS.height - height - 1)),
        width,
        height,
    };

    return room;
};

const overlapping = (room: Room, rooms: Room[]): boolean => {
    return rooms.some(
        (r) =>
            room.x < r.x + r.width &&
            r.x < room.x + room.width &&
            room.y < r.y + r.height &&
            r.y < room.y + room.height,
    );
};

const corridorBetweenPoints = (x1: number, y1: number, x2: number, y2: number, joinBy?: string): Point[] => {
    if ((x1 === x2 && y1 === y2) || x1 === x2 || y1 === y2) {
        return [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
        ];
    } else {
        let join = joinBy;

        if (joinBy === undefined && [0, 1].some((p) => [x1, x2, y1, y2].includes(p))) {
            join = "bottom";
        } else if (
            (joinBy === undefined &&
                [MAP_DIMENSIONS.width - 1, MAP_DIMENSIONS.width - 2].some((p) => [x1, x2].includes(p))) ||
            [MAP_DIMENSIONS.height - 1, MAP_DIMENSIONS.height - 2].some((p) => [y1, y2].includes(p))
        ) {
            join = "top";
        } else if (joinBy === undefined) {
            join = ["top", "bottom"][Math.floor(Math.random() * 2)];
        }

        if (join === "top") {
            return [
                { x: x1, y: y1 },
                { x: x1, y: y2 },
                { x: x2, y: y2 },
            ];
        } else {
            return [
                { x: x1, y: y1 },
                { x: x2, y: y1 },
                { x: x2, y: y2 },
            ];
        }
    }
};

const joinRooms = (roomOne: Room, roomTwo: Room, joinBy?: string) => {
    const px1 = roomOne.x + roomOne.width - 1;
    const py1 = roomOne.y + roomOne.height - 1;

    const px2 = roomTwo.x + roomTwo.width - 1;
    const py2 = roomTwo.y + roomTwo.height - 1;

    if (roomOne.x < roomTwo.x + roomTwo.width && roomTwo.x < roomOne.x + roomOne.width) {
        const jx = randBetween(roomTwo.x, px1);
        const tempY = [roomOne.y, roomTwo.y, py1, py2].sort();
        const jy1 = tempY[1] + 1;
        const jy2 = tempY[2] - 1;

        return corridorBetweenPoints(jx, jy1, jx, jy2);
    } else if (roomOne.y < roomTwo.y + roomTwo.height && roomTwo.y < roomOne.y + roomOne.height) {
        const jy = roomTwo.y > roomOne.y ? randBetween(roomTwo.y, py1) : randBetween(roomOne.y, py2);
        const tempX = [roomOne.x, roomTwo.x, px1, px2].sort();

        const jx1 = tempX[1] + 1;
        const jx2 = tempX[2] - 1;

        return corridorBetweenPoints(jx1, jy, jx2, jy);
    } else {
        const join = joinBy ? joinBy : ["top", "bottom"][Math.floor(Math.random() * 2)];

        if (join === "top") {
            if (roomTwo.y > roomOne.y) {
                const jx1 = px1 + 1;
                const jy1 = randBetween(roomOne.y, py1);
                const jx2 = randBetween(roomTwo.x, px2);
                const jy2 = roomTwo.y - 1;

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "bottom");
            } else {
                const jx1 = randBetween(roomOne.x, px1);
                const jy1 = roomOne.y - 1;
                const jx2 = roomTwo.x - 1;
                const jy2 = randBetween(roomTwo.y, py2);

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "top");
            }
        } else {
            if (roomTwo.y > roomOne.y) {
                const jx1 = randBetween(roomOne.x, px1);
                const jy1 = py1 + 1;
                const jx2 = roomTwo.x - 1;
                const jy2 = randBetween(roomTwo.y, py2);

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "top");
            } else {
                const jx1 = py1 + 1;
                const jy1 = randBetween(roomOne.y, py1);
                const jx2 = randBetween(roomTwo.x, px2);
                const jy2 = px2 + 1;

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "bottom");
            }
        }
    }
};

/**
 * Generate a random dungeon map.
 *
 * @param startPosition Where the player will be spawned, assuming it's the first map (i.e. floorNumber === 1),
 * or where the stairs between the current floor and the previous floor are.
 * @param floorNumber The current floor number
 */
const generateMap = (startPosition: Point, floorNumber: number): GameMap => {
    // Change the walls of the dungeon as the floors get higher
    const wallType = 5 + Math.floor(floorNumber / 30);

    // Create a map of walls to carve rooms and corridors from
    const map = createMapOfWalls(wallType);

    const rooms: (Dimension & Point)[] = [
        {
            x: startPosition.x,
            y: startPosition.y,
            width: randBetween(MIN_ROOM_DIMENSIONS.width, MAX_ROOM_DIMENSIONS.width),
            height: randBetween(MIN_ROOM_DIMENSIONS.height, MAX_ROOM_DIMENSIONS.height),
        },
    ];
    const corridors: Point[][] = [];

    for (let i = 0; i < ROOM_COUNT * 5; i++) {
        const room = generateRoom();
        if (rooms.length === 0 || !overlapping(room, rooms)) {
            rooms.push(room);
        }

        if (rooms.length >= ROOM_COUNT) {
            break;
        }
    }

    // Sort the rooms from left to right just to make the rest of this simpler
    rooms.sort((r1, r2) => r1.x - r2.x);

    for (let i = 0; i < rooms.length - 1; i++) {
        corridors.push(joinRooms(rooms[i], rooms[i + 1]));
    }

    // for (let i = 0; i < RANDOM_CONNECTIONS; i++) {
    //     const roomOne = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     const roomTwo = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     corridors.push(joinRooms(roomOne, roomTwo));
    // }

    // for (let i = 0; i < SPURS; i++) {
    //     const roomOne = {
    //         x: randBetween(2, MAP_DIMENSIONS.width - 2),
    //         y: randBetween(2, MAP_DIMENSIONS.height - 2),
    //         width: 1,
    //         height: 1,
    //     };
    //     const roomTwo = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     corridors.push(joinRooms(roomOne, roomTwo));
    // }

    rooms.forEach((room) => {
        for (let j = 0; j < room.height; j++) {
            for (let k = 0; k < room.width; k++) {
                map.tiles[room.y + j][room.x + k].value = 0;
            }
        }
    });

    corridors.forEach((corridor) => {
        const startx = Math.min(corridor[0].x, corridor[1].x);
        const starty = Math.min(corridor[0].y, corridor[1].y);

        for (let h = 0; h <= Math.abs(corridor[0].y - corridor[1].y); h++) {
            for (let w = 0; w <= Math.abs(corridor[0].x - corridor[1].x); w++) {
                map.tiles[starty + h][startx + w].value = 0;
            }
        }

        // The corridor has a bend in it
        if (corridor.length === 3) {
            const startx = Math.min(corridor[1].x, corridor[2].x);
            const starty = Math.min(corridor[1].y, corridor[2].y);

            for (let h = 0; h <= Math.abs(corridor[1].y - corridor[2].y); h++) {
                for (let w = 0; w <= Math.abs(corridor[1].x - corridor[2].x); w++) {
                    map.tiles[starty + h][startx + w].value = 0;
                }
            }
        }
    });

    // Finished dungeon generation, so lets populate it with some objects
    return generateObjects(map, floorNumber, startPosition, wallType);
};

export default generateMap;
