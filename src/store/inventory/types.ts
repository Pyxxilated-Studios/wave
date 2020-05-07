import { ItemType } from "../../types";
import { ResetAction } from "../system/types";

export interface InventoryState {
    items: (ItemType & { id: string })[];
    maxItems: number;
}

export const STARTING_ITEM = "STARTING_ITEM";
export const GET_ITEM = "GET_ITEM";
export interface GetItemAction {
    type: typeof GET_ITEM | typeof STARTING_ITEM;
    item: ItemType;
}

export const SELL_ITEM = "SELL_ITEM";
export interface SellItemAction {
    type: typeof SELL_ITEM;
    item: ItemType;
}

export const DROP_ITEM = "DROP_ITEM";
export interface DropItemAction {
    type: typeof DROP_ITEM;
    item: ItemType;
}
export const USE_ITEM = "USE_ITEM";
export interface UseItemAction {
    type: typeof USE_ITEM;
    item: ItemType;
}

export const UPGRADE_BACKPACK = "UPGRADE_BACKPACK";
interface UpgradeBackpackAction {
    type: typeof UPGRADE_BACKPACK;
    slots: number;
}

export type InventoryActionType =
    | GetItemAction
    | SellItemAction
    | DropItemAction
    | UseItemAction
    | UpgradeBackpackAction
    | ResetAction;
