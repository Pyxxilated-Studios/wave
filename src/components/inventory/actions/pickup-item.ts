import { RootThunk } from "../../../store";
import { setChestData } from "../../../store/world/actions";
import { getItem } from "../../../store/inventory/actions";
import { tooManyItems } from "../../../store/snackbar/actions";

const pickupItem = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { inventory, dialog, player } = getState();

    const item = dialog.chestOpen?.item;

    if (!item) return;

    const { items, maxItems } = inventory;

    if (items.length < maxItems) {
        // The item has now been taken, so make sure it gets deleted
        dispatch(setChestData({ experience: 0, gold: 0, position: player.position, populated: true }));
        dispatch(getItem(item));
    } else {
        // The item now needs to stay in the chest, so put it there
        dispatch(setChestData({ experience: 0, gold: 0, item, position: player.position, populated: true }));
        dispatch(tooManyItems(item));
    }
};

export default pickupItem;
