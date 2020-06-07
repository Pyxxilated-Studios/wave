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
            if (!(action.data || action.payload)) return initialState;

            if (action.payload) action.data = action.payload;

            return { ...initialState, ...action.data?.map };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default MapReducer;
