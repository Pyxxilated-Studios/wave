import { MAP_DIMENSIONS, MAP_PADDING_DISTANCE } from "../constants";
import { Tile, PaddingTiles, Point } from "../types";

const generatePaddingTiles = (): PaddingTiles => {
    // we need to add padding tiles so the player cannot see past the edge of the map
    const top: Tile[][] = [];
    const bottom: Tile[][] = [];
    const left: Tile[][] = [];
    const right: Tile[][] = [];

    for (let i = 0; i < MAP_PADDING_DISTANCE; i++) {
        const topRow: Tile[] = [];
        const bottomRow: Tile[] = [];

        for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
            topRow.push(new Tile(new Point(j, -i - 1), false, 0, Math.round(Math.random() * (4 - 1) + 1)));
            bottomRow.push(
                new Tile(new Point(j, i + MAP_DIMENSIONS.height), false, 0, Math.round(Math.random() * (4 - 1) + 1)),
            );
        }

        top.push(topRow);
        bottom.push(bottomRow);
    }

    for (let i = 0; i < MAP_DIMENSIONS.width + MAP_PADDING_DISTANCE; i++) {
        const leftRow: Tile[] = [];
        const rightRow: Tile[] = [];

        for (let j = 0; j < MAP_PADDING_DISTANCE; j++) {
            leftRow.push(
                new Tile(
                    new Point(j - MAP_PADDING_DISTANCE, i - MAP_PADDING_DISTANCE),
                    false,
                    0,
                    Math.round(Math.random() * (4 - 1) + 1),
                ),
            );
            rightRow.push(
                new Tile(
                    new Point(j + MAP_DIMENSIONS.width, i - MAP_PADDING_DISTANCE),
                    false,
                    0,
                    Math.round(Math.random() * (4 - 1) + 1),
                ),
            );
        }

        left.push(leftRow);
        right.push(rightRow);
    }

    return {
        top,
        bottom,
        left,
        right,
    };
};

export default generatePaddingTiles;
