export interface SystemState {
  largeView: boolean;
  sideMenu: boolean;
}

export const SET_LARGE_VIEW = "SET_LARGE_VIEW";
interface SetLargeViewAction {
  type: typeof SET_LARGE_VIEW;
  set: boolean;
}

export const SET_SIDE_MENU = "SET_SIDE_MENU";
interface SetSideMenuAction {
  type: typeof SET_SIDE_MENU;
  set: boolean;
}

export type SystemTypes = SetLargeViewAction | SetSideMenuAction;
