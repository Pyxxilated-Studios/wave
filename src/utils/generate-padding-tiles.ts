import { MAP_DIMENSIONS, MAP_PADDING_DISTANCE } from "../constants";
import { Tile, PaddingTiles } from "../types";

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
      topRow.push({
        location: { x: -i + -1, y: j },
        explored: false,
        variation: Math.round(Math.random() * (4 - 1) + 1),
        value: 0,
      });
      bottomRow.push({
        location: { x: i + MAP_DIMENSIONS.height, y: j },
        explored: false,
        variation: Math.round(Math.random() * (4 - 1) + 1),
        value: 0,
      });
    }

    top.push(topRow);
    bottom.push(bottomRow);
  }

  for (let i = 0; i < MAP_DIMENSIONS.width + MAP_PADDING_DISTANCE; i++) {
    const leftRow: Tile[] = [];
    const rightRow: Tile[] = [];

    for (let j = 0; j < MAP_PADDING_DISTANCE; j++) {
      leftRow.push({
        location: { x: i - MAP_PADDING_DISTANCE, y: j - MAP_PADDING_DISTANCE },
        explored: false,
        variation: Math.round(Math.random() * (4 - 1) + 1),
        value: 0,
      });
      rightRow.push({
        location: { x: i - MAP_PADDING_DISTANCE, y: j + MAP_DIMENSIONS.width },
        explored: false,
        variation: Math.round(Math.random() * (4 - 1) + 1),
        value: 0,
      });
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
