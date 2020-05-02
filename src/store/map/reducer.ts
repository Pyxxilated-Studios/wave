import { MapState, EXPLORE_TILES, MapTypes } from "./types";

const initialState: MapState = {
  sightBox: [],
  paddingSightBox: [],
};

export const MapReducer = (
  state = initialState,
  action: MapTypes
): MapState => {
  switch (action.type) {
    case EXPLORE_TILES:
      return {
        ...state,
        sightBox: action.tiles,
        paddingSightBox: action.paddingTiles,
      };

    default:
      return state;
  }
};

export default MapReducer;
