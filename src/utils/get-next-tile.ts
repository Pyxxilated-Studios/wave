import { WorldState } from "../store/world/types";
import { Point } from "../types";
import { SPRITE_SIZE } from "../constants";

const getNextTile = (world: WorldState, newPos: Point) => {
  const { randomMaps, floorNumber } = world;

  const currentMapData = randomMaps[floorNumber - 1];

  const { tiles } = currentMapData;
  const y = newPos.y / SPRITE_SIZE;
  const x = newPos.x / SPRITE_SIZE;
  // safely return the tiles value, otherwise return a wall
  return tiles[y] && tiles[y][x] ? tiles[y][x].value : 5;
};

export default getNextTile;
