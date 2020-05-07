import { ItemType } from "../../types";
import {
    InventoryActionType,
    GET_ITEM,
    STARTING_ITEM,
    USE_ITEM,
    DROP_ITEM,
    UPGRADE_BACKPACK,
    SELL_ITEM,
} from "./types";

export const getItem = (item: ItemType): InventoryActionType => {
    return {
        type: GET_ITEM,
        item,
    };
};

export const getStartingItem = (item: ItemType): InventoryActionType => {
    return {
        type: STARTING_ITEM,
        item,
    };
};

export const useItem = (item: ItemType): InventoryActionType => {
    return { type: USE_ITEM, item };
};

export const upgradeBackpack = (slots: number): InventoryActionType => {
    return { type: UPGRADE_BACKPACK, slots };
};

export const sellItem = (item: ItemType): InventoryActionType => {
    return { type: SELL_ITEM, item };
};

export const dropItem = (item: ItemType): InventoryActionType => {
    return { type: DROP_ITEM, item };
};
