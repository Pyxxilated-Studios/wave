export interface SystemState {
    largeView: boolean;
    sideMenu: boolean;
    sound: boolean;
    journalSideMenu: boolean;
    journalLittleSideMenu: boolean;
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

export const SET_SHOW_JOURNAL = "SET_SHOW_JOURNAL";
export interface SetShowJournalAction {
    type: typeof SET_SHOW_JOURNAL;
    set: boolean;
}

export const SET_SHOW_STATS_JOURNAL = "SET_SHOW_STATS_JOURNAL";
export interface SetShowStatsJournal {
    type: typeof SET_SHOW_STATS_JOURNAL;
    set: boolean;
}

export interface LoadData {
    dialog: any;
    inventory: any;
    journal: any;
    map: any;
    monsters: any;
    player: any;
    snackbar: any;
    stats: any;
    system: any;
    world: any;
}

export const LOAD = "LOAD";
export interface LoadAction {
    type: typeof LOAD | "persist/REHYDRATE";
    data?: LoadData;
    payload?: LoadData;
}

export const RESET = "RESET";
export interface ResetAction {
    type: typeof RESET;
}

export type SystemActionType =
    | SetLargeViewAction
    | SetSideMenuAction
    | SetSoundAction
    | SetShowJournalAction
    | SetShowStatsJournal
    | LoadAction
    | ResetAction;
