import { SIGHT_RADIUS, MAP_DIMENSIONS } from "../constants";
import { Point } from "../types";

export const radiusTiles = (radiusSize = SIGHT_RADIUS) => {
  const radTiles: Point[] = [];
  // calculate a tile map with desired radius
  // (results in array = [[-4,-4]...[0,0]...[4,4]] )
  for (let y = -radiusSize; y <= radiusSize; y++) {
    for (let x = -radiusSize; x <= radiusSize; x++) {
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
  // Calculate the surrounding tiles according to the bounds
  const surroundingTiles: Point[] = [];
  const paddingTiles: Point[] = [];

  // make sure the start position is within the bounds
  if (
    newPosition.x >= MAP_DIMENSIONS.width ||
    newPosition.x < 0 ||
    newPosition.y >= MAP_DIMENSIONS.height ||
    newPosition.y < 0
  ) {
    return { tiles: surroundingTiles, paddingTiles };
  }

  // add position as offset to each radius tile
  radiusTiles().forEach(({ x, y }) => {
    // get radius with location as offset
    const offsetX = x + newPosition.x;
    const offsetY = y + newPosition.y;

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
