import { ConsumableItem } from "../../../../../types";

// Credit: https://tfonez.itch.io/pixel-assets
import GreatManaPotionImage from "./great-mana-potion.png";

const GreatManaPotion: ConsumableItem = {
    name: "Great Mana Potion",
    type: "potion",
    kind: "mana",
    consumeEffect: { manaRestore: 40 },
    image: GreatManaPotionImage,
    price: 80,
};

export default GreatManaPotion;
