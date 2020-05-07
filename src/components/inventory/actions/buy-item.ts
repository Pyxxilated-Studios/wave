import { RootThunk } from "../../../store";
import { getItem, upgradeBackpack } from "../../../store/inventory/actions";
import { loseGold } from "../../../store/stats/actions";
import { tooManyItems, notEnoughGold } from "../../../store/snackbar/actions";

import { ItemType, Backpack } from "../../../types";

import calculateModifier from "../../../utils/calculate-modifier";
import calculatePrices from "../../../utils/calculate-price";

const buyItem = (item: ItemType): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, inventory } = getState();
    const { gold } = stats;
    const { items, maxItems } = inventory;

    const { buyPrice } = calculatePrices(item.value, calculateModifier(stats.abilities.charisma));

    // make sure player has enough gold
    if (gold >= buyPrice) {
        // if it's a backpack upgrade
        if (item.type === "backpack") {
            dispatch(loseGold(buyPrice));
            dispatch(upgradeBackpack((item as Backpack).slots));
        } // otherwise, see if there's room in the inventory
        else if (items.length < maxItems) {
            dispatch(loseGold(buyPrice));
            dispatch(getItem(item));
        } else {
            dispatch(tooManyItems(item));
        }
    } else {
        dispatch(notEnoughGold(item));
    }
};

export default buyItem;
