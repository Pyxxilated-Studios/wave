import { GameMap, Tile, Point } from "../../types";

export interface WorldState {
  currentMap: string | null;
  turn: number;
  randomMaps: GameMap[];
  chests: Record<string, Point>;
  floorNum: number;
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
  id: number;
}

export type WorldTypes = SetCurrentMapAction | GenerateMapAction;
