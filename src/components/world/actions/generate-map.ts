import { MAP_DIMENSIONS } from "../../../constants";
import { Point, GameMap } from "../../../types";

import { generate } from "wave";

/**
 * Generate a random dungeon map.
 *
 * @param startPosition Where the player will be spawned, assuming it's the first map (i.e. floorNumber === 1),
 * or where the stairs between the current floor and the previous floor are.
 * @param floorNumber The current floor number
 */
const generateMap = (startPosition: Point, floorNumber: number): GameMap => {
    const startingPoint = new Point(startPosition.x, startPosition.y);
    const tiles = generate(MAP_DIMENSIONS.width, MAP_DIMENSIONS.height, startingPoint, floorNumber);

    const map: GameMap = {
        tiles,
        paddingTiles: { top: [], bottom: [], left: [], right: [] },
        id: "",
    };

    return map;
};

export default generateMap;
