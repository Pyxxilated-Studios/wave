export interface SnackbarState {
    notEnoughGold?: string;
    tooManyItems?: string;
    itemDropped?: string;
    itemUsed?: string;
    itemReceived?: string;
    item?: null;
    errorMessage?: string;
    itemSold?: string;
}

export const NOTIFY_PLAYER = "NOTIFY_PLAYER";
interface NotifyPlayerAction {
    type: typeof NOTIFY_PLAYER;
    message: string;
}

export type SnackbarActionType = NotifyPlayerAction;
