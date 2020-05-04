import { WorldActionType, SET_CURRENT_MAP, GENERATE_MAP, SET_START_MAP } from './types';
import { Tile } from '../../types';

export const setCurrentMap = (map: string): WorldActionType => {
    return {
        type: SET_CURRENT_MAP,
        currentMap: map,
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
