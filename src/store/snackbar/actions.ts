import { SnackbarActionType, NOTIFY_PLAYER, CLEAR_NOTIFICATION, NOT_ENOUGH_GOLD, TOO_MANY_ITEMS } from "./types";
import { ItemType } from "../../types";

export const notifyPlayer = (message: string): SnackbarActionType => {
    return {
        type: NOTIFY_PLAYER,
        message,
    };
};

export const clearNotification = (): SnackbarActionType => {
    return { type: CLEAR_NOTIFICATION };
};

export const notEnoughGold = (item: ItemType): SnackbarActionType => {
    return { type: NOT_ENOUGH_GOLD, item };
};

export const tooManyItems = (item: ItemType): SnackbarActionType => {
    return { type: TOO_MANY_ITEMS, item };
};
