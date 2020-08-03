import { MapState, EXPLORE_TILES, MapActionType } from "./types";
import { RESET, LOAD } from "../system/types";

const initialState: MapState = {
    sightBox: [],
    paddingSightBox: [],
};

export const MapReducer = (state = initialState, action: MapActionType): MapState => {
    switch (action.type) {
        case EXPLORE_TILES:
            return {
                ...state,
                sightBox: action.tiles,
                paddingSightBox: action.paddingTiles,
            };

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.map };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default MapReducer;
