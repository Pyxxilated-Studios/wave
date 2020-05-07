import { RootThunk } from "../../../store";
import { useItem } from "../../../store/inventory/actions";

import { ConsumableItem, ItemType } from "../../../types";
import { heal, restore } from "../../../store/stats/actions";

const consumePotion = (item: ItemType): RootThunk => async (dispatch): Promise<void> => {
    const consumable = item as ConsumableItem;
    if (consumable.consumeEffect.healthRestore) {
        dispatch(heal("potion", consumable.consumeEffect.healthRestore));
    }

    if (consumable.consumeEffect.manaRestore) {
        dispatch(restore("potion", consumable.consumeEffect.manaRestore));
    }

    dispatch(useItem(item));
};

export default consumePotion;
