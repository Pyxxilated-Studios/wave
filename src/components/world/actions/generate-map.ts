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

const joinRooms = (room1: Room, room2: Room, joinBy?: string) => {
    const [r1, r2] = [room1, room2].sort((a, b) => a.x - b.x);

    const px1 = r1.x + r1.width - 1;
    const py1 = r1.y + r1.height - 1;

    const px2 = r2.x + r2.width - 1;
    const py2 = r2.y + r2.height - 1;

    if (r1.x < r2.x + r2.width && r2.x < r1.x + r1.width) {
        const jx = randBetween(r2.x, px1);
        const tempY = [r1.y, r2.y, py1, py2].sort();
        const jy1 = tempY[1] + 1;
        const jy2 = tempY[2] - 1;

        return corridorBetweenPoints(jx, jy1, jx, jy2);
    } else if (r1.y < r2.y + r2.height && r2.y < r1.y + r1.height) {
        const jy = r2.y > r1.y ? randBetween(r2.y, py1) : randBetween(r1.y, py2);
        const tempX = [r1.x, r2.x, px1, px2].sort();

        const jx1 = tempX[1] + 1;
        const jx2 = tempX[2] - 1;

        return corridorBetweenPoints(jx1, jy, jx2, jy);
    } else {
        const join = joinBy ? joinBy : ["top", "bottom"][Math.floor(Math.random() * 2)];

        if (join === "top") {
            if (r2.y > r1.y) {
                const jx1 = px1 + 1;
                const jy1 = randBetween(r1.y, py1);
                const jx2 = randBetween(r2.x, px2);
                const jy2 = r2.y - 1;

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "bottom");
            } else {
                const jx1 = randBetween(r1.x, px1);
                const jy1 = r1.y - 1;
                const jx2 = r2.x - 1;
                const jy2 = randBetween(r2.y, py2);

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "top");
            }
        } else {
            if (r2.y > r1.y) {
                const jx1 = randBetween(r1.x, px1);
                const jy1 = py1 + 1;
                const jx2 = r2.x - 1;
                const jy2 = randBetween(r2.y, py2);

                return corridorBetweenPoints(jx1, jy1, jx2, jy2, "top");
            } else {
                const jx1 = py1 + 1;
                const jy1 = randBetween(r1.y, py1);
                const jx2 = randBetween(r2.x, px2);
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

    // Create a map of walls to carve rooms and hallways from
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

    for (let i = 0; i < rooms.length - 1; i++) {
        corridors.push(joinRooms(rooms[i], rooms[i + 1]));
    }

    // for (let i = 0; i < RANDOM_CONNECTIONS; i++) {
    //     const room_1 = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     const room_2 = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     corridors.push(joinRooms(room_1, room_2));
    // }

    // for (let i = 0; i < SPURS; i++) {
    //     const room_1 = {
    //         x: randBetween(2, MAP_DIMENSIONS.width - 2),
    //         y: randBetween(2, MAP_DIMENSIONS.height - 2),
    //         width: 1,
    //         height: 1,
    //     };
    //     const room_2 = rooms[Math.floor(Math.random() * (rooms.length - 1))];
    //     corridors.push(joinRooms(room_1, room_2));
    // }

    rooms.forEach((room) => {
        for (let j = 0; j < room.height; j++) {
            for (let k = 0; k < room.width; k++) {
                map.tiles[room.y + j][room.x + k].value = 0;
            }
        }
    });

    corridors.forEach((corridor) => {
        for (let h = 0; h < Math.abs(corridor[0].y - corridor[1].y) + 1; h++) {
            for (let w = 0; w < Math.abs(corridor[0].x - corridor[1].x) + 1; w++) {
                map.tiles[Math.min(corridor[0].y, corridor[1].y) + h][
                    Math.min(corridor[0].x, corridor[1].x) + w
                ].value = 0;
            }
        }

        if (corridor.length === 3) {
            for (let h = 0; h < Math.abs(corridor[1].y - corridor[2].y) + 1; h++) {
                for (let w = 0; w < Math.abs(corridor[1].x - corridor[2].x) + 1; w++) {
                    map.tiles[Math.min(corridor[1].y, Math.min(corridor[2].y)) + h][
                        Math.min(corridor[1].x, corridor[2].x) + w
                    ].value = 0;
                }
            }
        }
    });

    // Array to get a random direction from (left,right,up,down)
    // const directions: Point[] = [
    //     { x: -1, y: 0 },
    //     { x: 1, y: 0 },
    //     { x: 0, y: -1 },
    //     { x: 0, y: 1 },
    // ];

    // // store the max tunnels in a local variable that can be decremented
    // let maxTunnels = MAX_TUNNELS;

    // // our current row - start at a random spot
    // let currentRow = startPosition.y;
    // // our current column - start at a random spot
    // let currentColumn = startPosition.x;

    // // save the last direction we went
    // let lastDirection: Point = { x: 0, y: 0 };

    // // next turn/direction - holds a value from directions
    // let randomDirection;

    // // lets create some tunnels - while maxTunnels, MAP_DIMENSIONS, and MAX_TUNNEL_LENGTH is greater than 0.
    // while (maxTunnels && MAP_DIMENSIONS && MAX_TUNNEL_LENGTH) {
    //     // lets get a random direction - until it is a perpendicular to our lastDirection
    //     // if the last direction = left or right,
    //     // then our new direction has to be up or down,
    //     // and vice versa
    //     do {
    //         randomDirection = directions[Math.floor(Math.random() * directions.length)];
    //     } while (
    //         (randomDirection.x === -lastDirection.x && randomDirection.y === -lastDirection.y) ||
    //         (randomDirection.x === lastDirection.x && randomDirection.y === lastDirection.y)
    //     );

    //     const randomLength = Math.ceil(Math.random() * MAX_TUNNEL_LENGTH); // length the next tunnel will be (max of maxLength)
    //     let tunnelLength = 0; // current length of tunnel being created

    //     // lets loop until our tunnel is long enough or until we hit an edge
    //     while (tunnelLength < randomLength) {
    //         //break the loop if it is going out of the map
    //         if (
    //             (currentRow === 0 && randomDirection.x === -1) ||
    //             (currentColumn === 0 && randomDirection.y === -1) ||
    //             (currentRow === MAP_DIMENSIONS.height - 1 && randomDirection.x === 1) ||
    //             (currentColumn === MAP_DIMENSIONS.width - 1 && randomDirection.y === 1)
    //         ) {
    //             break;
    //         } else {
    //             map.tiles[currentRow][currentColumn].value = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
    //             currentRow += randomDirection.x; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
    //             currentColumn += randomDirection.y;
    //             tunnelLength++; //the tunnel is now one longer, so lets increment that variable
    //         }
    //     }

    //     if (tunnelLength) {
    //         // update our variables unless our last loop broke before we made any part of a tunnel
    //         lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
    //         maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
    //     }
    // }

    // all our tunnels have been created and now we run placeObjects(),
    // which will complete our map, so lets return it to our render()
    return generateObjects(map, floorNumber, startPosition, wallType);
};

export default generateMap;
