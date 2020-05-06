import { ConsumableItem } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-potions-pack-1/
import DivineManaPotionImage from "./divine-mana-potion.png";

const DivineManaPotion: ConsumableItem = {
    name: "Divine Mana Potion",
    type: "potion",
    kind: "mana",
    consumeEffect: { manaRestore: 100 },
    image: DivineManaPotionImage,
    value: 200,
};

export default DivineManaPotion;
