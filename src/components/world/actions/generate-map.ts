import { MAP_DIMENSIONS } from "../../../constants";
import { Point, GameMap } from "../../../types";

import * as wave from "wave";

/**
 * Generate a random dungeon map.
 *
 * @param startPosition Where the player will be spawned, assuming it's the first map (i.e. floorNumber === 1),
 * or where the stairs between the current floor and the previous floor are.
 * @param floorNumber The current floor number
 */
const generateMap = (startPosition: Point, floorNumber: number): GameMap => {
    // We need to pass the Rust version of this, which requires a 'free' function,
    // however we aren't going to use it so it can just do nothing
    const startPositionShim = new wave.Point(startPosition.x, startPosition.y);

    const map: GameMap = {
        tiles: wave.generate(MAP_DIMENSIONS.width, MAP_DIMENSIONS.height, startPositionShim, floorNumber),
        paddingTiles: { top: [], bottom: [], left: [], right: [] },
        id: "",
    };

    return map;
};

export default generateMap;
