import { SnackbarActionType, NOTIFY_PLAYER, CLEAR_NOTIFICATION } from "./types";

export const notifyPlayer = (message: string): SnackbarActionType => {
    return {
        type: NOTIFY_PLAYER,
        message,
    };
};

export const clearNotification = (): SnackbarActionType => {
    return { type: CLEAR_NOTIFICATION };
};
