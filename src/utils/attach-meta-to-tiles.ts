import cloneDeep from "lodash.clonedeep";
import { Tile } from "../types";

export const attachMetaToTiles = (tiles: Tile[][]): Tile[][] => {
    const newTiles = cloneDeep(tiles);

    newTiles.forEach((_, tileRowIndex) => {
        newTiles[tileRowIndex].forEach((_, tileIndex) => {
            newTiles[tileRowIndex][tileIndex].variation = Math.round(Math.random() * (4 - 1) + 1);
        });
    });

    return newTiles;
};

export default attachMetaToTiles;
