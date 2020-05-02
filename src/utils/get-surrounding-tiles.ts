import { SIGHT_RADIUS, MAP_DIMENSIONS, SPRITE_SIZE } from "../constants";
import { Point, Tile } from "../types";

export const radiusTiles = (radiusSize = SIGHT_RADIUS) => {
  let x, y;
  const radTiles = [];
  // calculate a tile map with desired radius
  // (results in array = [[-4,-4]...[0,0]...[4,4]] )
  for (y = -radiusSize; y <= radiusSize; y++) {
    for (x = -radiusSize; x <= radiusSize; x++) {
      if (x * x + y * y <= radiusSize * radiusSize) {
        radTiles.push({ x, y });
      }
    }
  }

  return radTiles;
};

// takes an array of relative coordinates to the map size (20 x 15) i.e. [1, 1]
export default function getSurroundingTiles(
  newPosition: Point
): { tiles: Point[]; paddingTiles: Point[] } {
  // make sure the new position is in relative map tile size
  const x =
    newPosition.x % SPRITE_SIZE === 0
      ? newPosition.x / SPRITE_SIZE
      : newPosition.x;
  const y =
    newPosition.y % SPRITE_SIZE === 0
      ? newPosition.y / SPRITE_SIZE
      : newPosition.y;
  // set tile to relative tile position
  const startPosition: Point = { x, y };

  // then calculate the surrounding tiles according to the bounds
  const surroundingTiles: Point[] = [];
  const paddingTiles: Point[] = [];

  // make sure the start position is within the bounds
  if (
    startPosition.x >= MAP_DIMENSIONS.width ||
    startPosition.x < 0 ||
    startPosition.y >= MAP_DIMENSIONS.height ||
    startPosition.y < 0
  ) {
    return { tiles: surroundingTiles, paddingTiles };
  }

  // add position as offset to each radius tile
  radiusTiles().forEach(({ x, y }) => {
    // get radius with location as offset
    const offsetX = x + startPosition.x;
    const offsetY = y + startPosition.y;

    // if it is inside the bounds
    if (
      offsetX >= 0 &&
      offsetX < MAP_DIMENSIONS.width &&
      offsetY >= 0 &&
      offsetY < MAP_DIMENSIONS.height
    ) {
      // add to surrounding tiles...
      surroundingTiles.push({ x: offsetX, y: offsetY });
    } else {
      // otherwise add the tile to padding tiles array
      paddingTiles.push({ x: offsetX, y: offsetY });
    }
  });

  return {
    tiles: surroundingTiles,
    paddingTiles,
  };
}
