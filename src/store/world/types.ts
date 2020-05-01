export interface WorldState {
  currentMap: string | null;
  map: [];
}

export const SET_CURRENT_MAP = "SET_CURRENT_MAP";
interface SetCurrentMapAction {
  type: typeof SET_CURRENT_MAP;
  map: string;
}

export const LOAD_MAP = "LOAD_MAP";
interface LoadMapAction {
  type: typeof LOAD_MAP;
}

export type WorldTypes = SetCurrentMapAction | LoadMapAction;
