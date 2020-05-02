import { Point } from "../../types";

export interface MapState {
  sightBox: Point[];
  paddingSightBox: Point[];
}

export const EXPLORE_TILES = "EXPLORE_TILES";
interface ExploreTiles {
  type: typeof EXPLORE_TILES;
  tiles: Point[];
  paddingTiles: Point[];
}

export type MapTypes = ExploreTiles;
