import { WorldTypes, LOAD_MAP, SET_CURRENT_MAP } from "./types";

export const setCurrentMap = (map: string): WorldTypes => {
  return {
    type: SET_CURRENT_MAP,
    map: map,
  };
};

export const loadMap = (): WorldTypes => {
  return {
    type: LOAD_MAP,
  };
};
