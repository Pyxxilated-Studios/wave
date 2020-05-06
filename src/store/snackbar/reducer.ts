import { SnackbarState, SnackbarActionType, NOTIFY_PLAYER, CLEAR_NOTIFICATION } from "./types";
import { RESET } from "../system/types";
import { GET_ITEM, SELL_ITEM, DROP_ITEM, USE_ITEM } from "../inventory/types";

const initialState: SnackbarState = {
    notEnoughGold: "",
    tooManyItems: "",
    itemDropped: "",
    itemUsed: "",
    itemReceived: "",
    item: undefined,
    message: "",
    itemSold: "",
};

const SnackbarReducer = (state = initialState, action: SnackbarActionType): SnackbarState => {
    switch (action.type) {
        case NOTIFY_PLAYER:
            return { ...state, message: action.message };

        case GET_ITEM:
            return {
                ...state,
                itemReceived: `${action.item.name}-${new Date().getTime()}`,
                item: action.item,
            };

        case SELL_ITEM:
            return {
                ...state,
                itemSold: `${action.item.name}-${new Date().getTime()}`,
                item: action.item,
            };

        case DROP_ITEM:
            return {
                ...state,
                itemDropped: `${action.item.name}-${new Date().getTime()}`,
                item: action.item,
            };

        case USE_ITEM:
            return {
                ...state,
                itemUsed: `${action.item.name}-${new Date().getTime()}`,
                item: action.item,
            };

        case CLEAR_NOTIFICATION:
        case RESET:
            return initialState;

        default:
            return { ...state };
    }
};

export default SnackbarReducer;
