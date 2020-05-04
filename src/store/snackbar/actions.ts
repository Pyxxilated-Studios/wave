import { SnackbarActionType, NOTIFY_PLAYER } from "./types";

export const notifyPlayer = (message: string): SnackbarActionType => {
    return {
        type: NOTIFY_PLAYER,
        message,
    };
};
