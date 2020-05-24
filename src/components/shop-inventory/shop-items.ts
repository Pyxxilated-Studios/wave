import items, { randomItemsT1, randomItemsT2, randomItemsT3, randomItemsT4 } from "../../data/items";
import { TIER_2, TIER_3, TIER_4 } from "../../constants";
import { ItemType } from "../../types";

const purchaseOnlyT1 = [
    items.miscellaneous.other.BackpackUpgrade,
    items.miscellaneous.potions.HealthPotion,
    items.miscellaneous.potions.ManaPotion,
];

const purchaseOnlyT2 = [
    ...purchaseOnlyT1,
    items.miscellaneous.potions.GreatHealthPotion,
    items.miscellaneous.potions.GreatManaPotion,
];

const purchaseOnlyT3 = [
    ...purchaseOnlyT2,
    items.miscellaneous.potions.MightyHealthPotion,
    items.miscellaneous.potions.MightyManaPotion,
];

const purchaseOnlyT4 = [
    ...purchaseOnlyT3,
    items.miscellaneous.potions.DivineHealthPotion,
    items.miscellaneous.potions.DivineManaPotion,
];

// returns the correct tier of items depending on player level
const shopItems = (level: number): ItemType[] => {
    if (level < TIER_2) {
        return [...randomItemsT1, ...purchaseOnlyT1];
    }
    if (level < TIER_3) {
        return [...randomItemsT2, ...purchaseOnlyT2];
    }
    if (level < TIER_4) {
        return [...randomItemsT3, ...purchaseOnlyT3];
    }
    return [...randomItemsT4, ...purchaseOnlyT4];
};

export default shopItems;
