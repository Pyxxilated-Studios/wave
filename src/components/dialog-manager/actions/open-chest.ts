import { RootThunk } from "../../../store";

import { randomItem } from "../dialogs/chest-loot/random-item";
import { setChestData } from "../../../store/world/actions";

const openChest = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, dialog, player } = getState();
    const { level } = stats;

    const { chestOpen } = dialog;

    const item = chestOpen?.item;

    const { x, y } = player.position;

    let itemDrop = undefined;
    if ((x !== chestOpen?.position.x || y !== chestOpen?.position.y) && !item) {
        // Give the player a 25% chance to get a random item, only if there isn't an item already in it
        const chance = Math.floor(Math.random() * 100) + 1;
        if (chance <= 25) {
            itemDrop = randomItem(level);
        }
    } else {
        // An item is already in the chest, so let's use it
        itemDrop = item;
    }

    // get a random amount of gold between 1 and 8 PLUS player level x3
    const gold = Math.floor(Math.random() * 8) + 1 + level * 3;
    // get some level based exp
    const experience = level * 5 + 5;

    dispatch(
        setChestData({
            experience,
            gold,
            item: itemDrop,
            position: player.position,
        }),
    );
};

export default openChest;
