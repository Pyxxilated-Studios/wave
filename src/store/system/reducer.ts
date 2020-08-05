import {
    SystemState,
    SystemActionType,
    SET_LARGE_VIEW,
    SET_SIDE_MENU,
    SET_SOUND,
    SET_SHOW_JOURNAL,
    LOAD,
    SET_SHOW_STATS_JOURNAL,
} from "./types";

const initialState: SystemState = {
    largeView: false,
    sideMenu: false,
    sound: false,
    journalSideMenu: false,
    journalLittleSideMenu: false,
};

const SystemReducer = (state = initialState, action: SystemActionType): SystemState => {
    switch (action.type) {
        case SET_LARGE_VIEW:
            return { ...state, largeView: action.set };

        case SET_SIDE_MENU:
            return { ...state, sideMenu: action.set };

        case SET_SOUND:
            return { ...state, sound: action.set };

        case SET_SHOW_JOURNAL:
            return { ...state, journalSideMenu: action.set };

        case SET_SHOW_STATS_JOURNAL:
            return { ...state, journalLittleSideMenu: action.set };

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.system };

        default:
            return state;
    }
};

export default SystemReducer;
