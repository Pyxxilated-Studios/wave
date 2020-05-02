import { WorldTypes, SET_CURRENT_MAP, GENERATE_MAP } from "./types";
import { Tile } from "../../types";

export const setCurrentMap = (map: string): WorldTypes => {
  return {
    type: SET_CURRENT_MAP,
    currentMap: map,
  };
};

export const generateMap = (tiles: Tile[][], id: number): WorldTypes => {
  return {
    type: GENERATE_MAP,
    tiles: tiles,
    id: id,
  };
};
