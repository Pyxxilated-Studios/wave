import { GameMap, Tile, Point, ItemType, ChestContents } from "../../types";
import { ExploreTilesAction } from "../map/types";
import { PlayerTurnAction } from "../player/types";
import { ResetAction } from "../system/types";

export interface WorldState {
    currentMap: string;
    turn: number;
    randomMaps: GameMap[];
    chests: Record<string, { position: Point; item?: ItemType }>;
    floorNumber: number;
    mapTransition: boolean;
}

export const SET_CURRENT_MAP = "SET_CURRENT_MAP";
interface SetCurrentMapAction {
    type: typeof SET_CURRENT_MAP;
    currentMap: string;
    floorNumber: number;
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

export const MAP_TRANSITION = "MAP_TRANSITION";
interface MapTransitionAction {
    type: typeof MAP_TRANSITION;
}

export const SET_CHEST_DATA = "SET_CHEST_DATA";
export interface SetChestDataAction {
    type: typeof SET_CHEST_DATA;
    data?: ChestContents;
}

export const OPEN_CHEST = "OPEN_CHEST";
interface OpenChestAction {
    type: typeof OPEN_CHEST;
    position: Point;
}

export type WorldActionType =
    | SetCurrentMapAction
    | GenerateMapAction
    | SetStartMapAction
    | ExploreTilesAction
    | PlayerTurnAction
    | MapTransitionAction
    | SetChestDataAction
    | OpenChestAction
    | ResetAction;
