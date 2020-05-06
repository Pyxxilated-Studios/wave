import { ItemType } from "../../types";
import { InventoryActionType, GET_ITEM, STARTING_ITEM } from "./types";

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
