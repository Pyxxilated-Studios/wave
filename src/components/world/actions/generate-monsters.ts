import generateMonsterType from './generate-monster-type';
import getSurroundingTiles from '../../../utils/get-surrounding-tiles';
import { MAP_DIMENSIONS } from '../../../constants';
import { GameMap, Point, Entity } from '../../../types';

import monsterData from '../../../data/monsters';

// generates random monsters for a random map
const generateMonsters = (floorNumber: number, map: GameMap, playerPosition: Point, playerLevel: number): Entity[] => {
    const availableTiles: Point[] = [];
    // we need to get the tiles from the surrounding tiles func,
    // then reverse the coordinates because they come back in normal notation (y, x)
    // but for the random map gen, we need them in (x, y)
    const vision = getSurroundingTiles(playerPosition);

    for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
        for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
            // some maps have their meta attached, some dont, so we need to read the value either way
            const mapValue = map.tiles[i][j].value;

            // get a list of floor tiles
            if (mapValue === 0) {
                availableTiles.push({ y: i, x: j });
            }
        }
    }

    // Remove the available tiles that are within the players vision
    const tilesNotInView = availableTiles.filter((pos) => !vision.tiles.includes(pos));

    // generate number of monsters for the map based on floor number and player level
    const numberMonsters = Math.ceil(floorNumber / playerLevel) * Math.round(Math.random() * (4 - 2) + 2);

    const monsterTiles: Point[] = [];

    // get an array of tiles to position the random monsters
    for (let x = 0; x < numberMonsters; x++) {
        if (tilesNotInView.length > 0) {
            const randomIndex = Math.floor(Math.random() * tilesNotInView.length);
            monsterTiles.push(availableTiles[randomIndex]);
            tilesNotInView.splice(randomIndex, 1);
        } else {
            break;
        }
    }

    // generate the monster type and create an array of monster objects
    return monsterTiles.map((location) => {
        const type = generateMonsterType(playerLevel);
        return {
            location,
            type,
            ...Reflect.get(monsterData, type),
        };
    });
};

export default generateMonsters;
