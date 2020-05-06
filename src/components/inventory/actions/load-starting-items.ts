import { RootThunk } from "../../../store";
import { getStartingItem } from "../../../store/inventory/actions";
import { equipItem, getGold } from "../../../store/stats/actions";

import items from "../../../data/items";

const loadStartingItems = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { characterRace, characterClass } = getState().dialog.character;

    switch (characterClass) {
        case "Fighter":
            dispatch(getStartingItem(items.weapons.swords.RustySword));
            break;
        case "Wizard":
            dispatch(getStartingItem(items.weapons.staffs.BlackStaff));
            break;
        case "Ranger":
            dispatch(getStartingItem(items.weapons.ranged.Boomerang));
            break;
        default:
            dispatch(getStartingItem(items.weapons.swords.RustySword));
            break;
    }

    dispatch(equipItem(getState().inventory.items[0]));

    switch (characterRace) {
        case "Human":
            dispatch(getStartingItem(items.clothes.armour.LeatherBoots));
            dispatch(equipItem(getState().inventory.items[1]));
            break;
        case "Elf":
            dispatch(getStartingItem(items.clothes.armour.LeatherGloves));
            dispatch(equipItem(getState().inventory.items[1]));
            break;
        case "Dwarf":
        default:
            dispatch(getGold(30));
            break;
    }
};

export default loadStartingItems;
