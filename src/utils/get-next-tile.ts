import { WorldState } from "../store/world/types";
import { Point } from "../types";
import { MAP_SIZE } from "../constants";

const getNextTile = (world: WorldState, newPosition: Point): number => {
    const { randomMaps, floorNumber } = world;

    const currentMapData = randomMaps[floorNumber - 1];

    const { tiles } = currentMapData;
    const { x, y } = newPosition;
    // safely return the tiles value, otherwise return a wall
    if (y >= MAP_SIZE.height || x >= MAP_SIZE.width || y < 0 || x < 0) {
        return 5;
    }

    return tiles[newPosition.y][newPosition.x].value;
};

export default getNextTile;
