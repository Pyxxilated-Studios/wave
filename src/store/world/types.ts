import { GameMap, Tile, Point } from "../../types";
import { ExploreTilesAction } from "../map/types";

export interface WorldState {
  currentMap: string | null;
  turn: number;
  randomMaps: GameMap[];
  chests: Record<string, Point>;
  floorNumber: number;
  mapTransition: false;
}

export const SET_CURRENT_MAP = "SET_CURRENT_MAP";
interface SetCurrentMapAction {
  type: typeof SET_CURRENT_MAP;
  currentMap: string;
}

export const GENERATE_MAP = "GENERATE_MAP";
interface GenerateMapAction {
  type: typeof GENERATE_MAP;
  tiles: Tile[][];
  id: string;
}

export const SET_START_MAP = "SET_START_MAP";
interface SetStartMapAction {
  type: typeof SET_START_MAP;
  startingMap: string;
  floorNumber: number;
}

export type WorldTypes =
  | SetCurrentMapAction
  | GenerateMapAction
  | SetStartMapAction
  | ExploreTilesAction;
