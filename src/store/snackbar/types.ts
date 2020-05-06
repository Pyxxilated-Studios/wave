import { ResetAction } from "../system/types";
import { ItemType } from "../../types";
import { EquipItemAction } from "../stats/types";
import { GetItemAction, SellItemAction, DropItemAction, UseItemAction } from "../inventory/types";

export interface SnackbarState {
    notEnoughGold?: string;
    tooManyItems?: string;
    itemDropped?: string;
    itemUsed?: string;
    itemReceived?: string;
    item?: ItemType;
    message?: string;
    itemSold?: string;
}

export const NOTIFY_PLAYER = "NOTIFY_PLAYER";
interface NotifyPlayerAction {
    type: typeof NOTIFY_PLAYER;
    message: string;
}

export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
interface ClearNotificationAction {
    type: typeof CLEAR_NOTIFICATION;
}

export type SnackbarActionType =
    | NotifyPlayerAction
    | ClearNotificationAction
    | EquipItemAction
    | GetItemAction
    | SellItemAction
    | DropItemAction
    | UseItemAction
    | ResetAction;
