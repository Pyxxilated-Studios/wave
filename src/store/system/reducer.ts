import { SystemState, SystemActionType, SET_SIDE_MENU, SET_SOUND, LOAD, SET_ABILITY_INDICATOR } from "./types";

const initialState: SystemState = {
    sideMenu: false,
    sound: false,
    abilityScoreIndicator: false,
};

const SystemReducer = (state = initialState, action: SystemActionType): SystemState => {
    switch (action.type) {
        case SET_SIDE_MENU:
            return { ...state, sideMenu: action.set };

        case SET_SOUND:
            return { ...state, sound: action.set };

        case SET_ABILITY_INDICATOR:
            return { ...state, abilityScoreIndicator: action.set };

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.system };

        default:
            return state;
    }
};

export default SystemReducer;
