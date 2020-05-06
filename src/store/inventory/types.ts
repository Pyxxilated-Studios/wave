import { ItemType } from "../../types";
import { ResetAction } from "../system/types";

export interface InventoryState {
    items: (ItemType & { id: string })[];
    maxItems: number;
}

export const STARTING_ITEM = "STARTING_ITEM";
export const GET_ITEM = "GET_ITEM";
interface GetItemAction {
    type: typeof GET_ITEM | typeof STARTING_ITEM;
    item: ItemType;
}

export const SELL_ITEM = "SELL_ITEM";
interface SellItemAction {
    type: typeof SELL_ITEM;
    item: ItemType;
}

export const DROP_ITEM = "DROP_ITEM";
interface DropItemAction {
    type: typeof DROP_ITEM;
    item: ItemType;
}
export const USE_ITEM = "USE_ITEM";
interface UseItemAction {
    type: typeof USE_ITEM;
    item: ItemType;
}

export type InventoryActionType = GetItemAction | SellItemAction | DropItemAction | UseItemAction | ResetAction;
