import { WorldState, WorldTypes, SET_CURRENT_MAP, LOAD_MAP } from "./types";

const initialState: WorldState = {
  currentMap: null,
  map: [],
};

const WorldReducer = (state = initialState, action: WorldTypes): WorldState => {
  switch (action.type) {
    case SET_CURRENT_MAP:
      return { ...state, currentMap: action.map };

    case LOAD_MAP:
      return { ...state };

    default:
      return state;
  }
};

export default WorldReducer;
