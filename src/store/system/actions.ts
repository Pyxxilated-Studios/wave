import { SystemTypes, SET_LARGE_VIEW, SET_SIDE_MENU } from "./types";

export const setLargeView = (to: boolean): SystemTypes => {
  return {
    type: SET_LARGE_VIEW,
    set: to,
  };
};

export const loadMap = (to: boolean): SystemTypes => {
  return {
    type: SET_SIDE_MENU,
    set: to,
  };
};
