import cloneDeep from 'lodash.clonedeep';
import { Tile } from '../types';

export const attachMetaToTiles = (tiles: Tile[][]) => {
    const newTiles = cloneDeep(tiles);

    newTiles.forEach((_, tileRowIndex) => {
        newTiles[tileRowIndex].forEach((_, tileIndex) => {
            newTiles[tileRowIndex][tileIndex] = {
                ...newTiles[tileRowIndex][tileIndex],
                // this is used for showing visited tiles
                explored: false,
                // add a variation for tiles that allow for it (random num: 1 - 4)
                variation: Math.round(Math.random() * (4 - 1) + 1),
            };
        });
    });

    return newTiles;
};

export default attachMetaToTiles;
