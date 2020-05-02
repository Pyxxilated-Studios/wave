import { MapTypes, EXPLORE_TILES } from "./types";
import { Point } from "../../types";
import getSurroundingTiles from "../../utils/get-surrounding-tiles";

export const exploreTiles = (position: Point): MapTypes => {
  const { tiles, paddingTiles } = getSurroundingTiles(position);

  return {
    type: EXPLORE_TILES,
    tiles: tiles,
    paddingTiles: paddingTiles,
  };
};
