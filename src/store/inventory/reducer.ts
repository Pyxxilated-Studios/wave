import cloneDeep from "lodash.clonedeep";
import { v4 as uuidv4 } from "uuid";

import { InventoryState, InventoryActionType, GET_ITEM, STARTING_ITEM } from "./types";
import { RESET, LOAD } from "../system/types";
import { MAX_ITEMS } from "../../constants";

const initialState: InventoryState = {
    items: [],
    maxItems: MAX_ITEMS,
};

const InventoryReducer = (state = initialState, action: InventoryActionType): InventoryState => {
    switch (action.type) {
        case STARTING_ITEM:
        case GET_ITEM: {
            const newState = cloneDeep(state);
            // save item to list with unique id for keeping track of duplicates
            newState.items.push({ ...action.item, id: uuidv4() });

            return newState;
        }

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.inventory };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default InventoryReducer;
