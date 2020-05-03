import { MapState, EXPLORE_TILES, MapActionType } from "./types";

const initialState: MapState = {
  sightBox: [],
  paddingSightBox: [],
};

export const MapReducer = (
  state = initialState,
  action: MapActionType
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
