import {
  SystemState,
  SystemTypes,
  SET_LARGE_VIEW,
  SET_SIDE_MENU,
} from "./types";

const initialState: SystemState = {
  largeView: false,
  sideMenu: false,
};

const SystemReducer = (
  state = initialState,
  action: SystemTypes
): SystemState => {
  switch (action.type) {
    case SET_LARGE_VIEW:
      return { ...state, largeView: action.set };

    case SET_SIDE_MENU:
      return { ...state, sideMenu: action.set };

    default:
      return state;
  }
};

export default SystemReducer;
