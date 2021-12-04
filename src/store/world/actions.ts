import {
    WorldActionType,
    SET_CURRENT_MAP,
    GENERATE_MAP,
    SET_START_MAP,
    MAP_TRANSITION,
    SET_CHEST_DATA,
    OPEN_CHEST,
    ADD_BLOOD_SPILL,
} from "./types";
import { ChestContents, Point } from "../../types";

import { Tile } from "wave";

export const setCurrentMap = (map: string, floorNumber: number): WorldActionType => {
    return {
        type: SET_CURRENT_MAP,
        currentMap: map,
        floorNumber,
    };
};

export const loadMap = (tiles: Tile[][], id: string): WorldActionType => {
    return {
        type: GENERATE_MAP,
        tiles,
        id,
    };
};

export const setStartMap = (startingMap: string, floorNumber: number): WorldActionType => {
    return {
        type: SET_START_MAP,
        startingMap,
        floorNumber,
    };
};

export const transitionMap = (): WorldActionType => {
    return { type: MAP_TRANSITION };
};

export const setChestData = (data: ChestContents): WorldActionType => {
    return { type: SET_CHEST_DATA, data };
};

export const openChest = (position: Point): WorldActionType => {
    return { type: OPEN_CHEST, position };
};

export const addBloodSpill = (position: Point): WorldActionType => {
    return { type: ADD_BLOOD_SPILL, position };
};
