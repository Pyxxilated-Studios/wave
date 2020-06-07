import { SIGHT_RADIUS, MAP_DIMENSIONS } from "../constants";
import { Point } from "../types";

/**
 * Get a list of all positions within a radius
 *
 * @param radius
 */
export const radiusTiles = (position: Point, radius = SIGHT_RADIUS): Point[] => {
    const radTiles = [];
    // calculate a tile map with desired radius
    // (results in array = [[-4,-4]...[0,0]...[4,4]] )
    for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
            if (x * x + y * y <= radius * radius) {
                radTiles.push({ x: x + position.x, y: y + position.y });
            }
        }
    }

    return radTiles;
};

/**
 * Get the tiles surrounding a position
 *
 * @param position The position to search around
 */
const getSurroundingTiles = (position: Point): { tiles: Point[]; paddingTiles: Point[] } => {
    // Calculate the surrounding tiles according to the bounds
    const surroundingTiles: Point[] = [];
    const paddingTiles: Point[] = [];

    // make sure the start position is within the bounds
    if (position.x >= MAP_DIMENSIONS.width || position.x < 0 || position.y >= MAP_DIMENSIONS.height || position.y < 0) {
        return { tiles: surroundingTiles, paddingTiles };
    }

    // add position as offset to each radius tile
    radiusTiles(position).forEach(({ x, y }) => {
        // if it is inside the bounds
        if (x >= 0 && x < MAP_DIMENSIONS.width && y >= 0 && y < MAP_DIMENSIONS.height) {
            // add to surrounding tiles...
            surroundingTiles.push({ x, y });
        } else {
            // otherwise add the tile to padding tiles array
            paddingTiles.push({ x, y });
        }
    });

    return {
        tiles: surroundingTiles,
        paddingTiles,
    };
};

export default getSurroundingTiles;
