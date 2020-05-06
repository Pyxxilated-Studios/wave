import { ConsumableItem } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-potions-pack-1/
import MightyManaPotionImage from "./mighty-mana-potion.png";

const MightyManaPotion: ConsumableItem = {
    name: "Mighty Mana Potion",
    type: "potion",
    kind: "mana",
    consumeEffect: { manaRestore: 60 },
    image: MightyManaPotionImage,
    value: 100,
};

export default MightyManaPotion;
