import { Point, GameMap } from "../../../types";
import { MAP_DIMENSIONS } from "../../../constants";

import getSurroundingTiles from "../../../utils/get-surrounding-tiles";
import { randBetween } from "../../../utils/rand_between";

/**
 * Generate a shop in a random position
 *
 * @param map The map to generate the shop in
 * @param availableWalls The walls that are adjacent to floor tiles
 */
const generateShop = (map: GameMap, availableWalls: Point[]): GameMap => {
    if (availableWalls.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableWalls.length);
        const tile = availableWalls[randomIndex];

        map.tiles[tile.y][tile.x].value = 9;
    }

    return map;
};

// Randomly generates chests, stairs and shops onto an existing random map
const generateObjects = (map: GameMap, floorNumber: number, playerPosition: Point, wallType: number): GameMap => {
    const initialTiles = [];
    const availableTiles = [];

    const vision = getSurroundingTiles(playerPosition);

    for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
        for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
            // get a list of floor tiles
            if (map.tiles[i][j].value === 0) {
                const pos: Point = { x: j, y: i };
                initialTiles.push(pos);

                if (!vision.tiles.some((tile) => tile.x === pos.x && tile.y === pos.y)) {
                    availableTiles.push(pos);
                }
            }
        }
    }

    // show stairs down if floor is greater than 1
    if (floorNumber > 1) {
        map.tiles[playerPosition.y][playerPosition.x].value = 2;
    }

    // generate stairs up OUTSIDE the player's sight if possible
    if (availableTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const tile = availableTiles[randomIndex];

        map.tiles[tile.y][tile.x].value = 3;
        availableTiles.splice(randomIndex, 1);
    } else {
        // if we don't have room outside player sight, place stairs on any floor tile
        const randomIndex = Math.floor(Math.random() * initialTiles.length);
        const tile = initialTiles[randomIndex];
        // if the tile is occupied by the player
        // remove the player's position from available tiles and get another random one
        if (tile.y === playerPosition.y && tile.x === playerPosition.x) {
            initialTiles.splice(randomIndex, 1);

            const newRandomIndex = Math.floor(Math.random() * initialTiles.length);
            const newTile = initialTiles[newRandomIndex];

            map.tiles[newTile.y][newTile.x].value = 3;
        } else {
            // safely place the stairs
            map.tiles[tile.y][tile.x].value = 3;
        }
    }

    const randomChests = randBetween(0, 5);

    // place the chests on empty tiles
    for (let x = 0; x < randomChests; x++) {
        if (availableTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const tile = availableTiles.splice(randomIndex, 1)[0];

            map.tiles[tile.y][tile.x].value = 4;
        }
    }

    // generate a shop every 4 floors
    if (floorNumber % 4 === 0) {
        const availableWalls = [];

        // get a list of available wall tiles
        for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
            for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
                // make sure the wall tile touches a path so it can be reached
                if (
                    map.tiles[i][j].value === wallType &&
                    ((i - 1 > 0 && map.tiles[i - 1][j].value === 0) ||
                        (i + 1 < MAP_DIMENSIONS.height && map.tiles[i + 1][j].value === 0) ||
                        (j - 1 > 0 && map.tiles[i][j - 1].value === 0) ||
                        (j + 1 < MAP_DIMENSIONS.width && map.tiles[i][j + 1].value === 0))
                ) {
                    availableWalls.push({ x: j, y: i });
                }
            }
        }

        map = generateShop(map, availableWalls);
    }

    return map;
};

export default generateObjects;
