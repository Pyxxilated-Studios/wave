import { SnackbarState, SnackbarActionType, NOTIFY_PLAYER } from "./types";

const initialState: SnackbarState = {
    notEnoughGold: "",
    tooManyItems: "",
    itemDropped: "",
    itemUsed: "",
    itemReceived: "",
    item: null,
    errorMessage: "",
    itemSold: "",
};

const SnackbarReducer = (state = initialState, action: SnackbarActionType): SnackbarState => {
    switch (action.type) {
        case NOTIFY_PLAYER:
            return { ...state, errorMessage: action.message };

        default:
            return { ...state };
    }
};

export default SnackbarReducer;
