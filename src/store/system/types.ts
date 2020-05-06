export interface SystemState {
    largeView: boolean;
    sideMenu: boolean;
    sound: boolean;
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

export const SET_SOUND = "SET_SOUND";
interface SetSoundAction {
    type: typeof SET_SOUND;
    set: boolean;
}

export const RESET = "RESET";
export interface ResetAction {
    type: typeof RESET;
}

export type SystemActionType = SetLargeViewAction | SetSideMenuAction | SetSoundAction | ResetAction;
