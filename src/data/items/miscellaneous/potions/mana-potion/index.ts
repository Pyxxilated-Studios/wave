import { ConsumableItem } from "../../../../../types";

// Credit: https://tfonez.itch.io/pixel-assets
import ManaPotionImage from "./mana-potion.png";

const ManaPotion: ConsumableItem = {
    name: "Mana Potion",
    type: "potion",
    kind: "mana",
    consumeEffect: { manaRestore: 15 },
    image: ManaPotionImage,
    value: 40,
};

export default ManaPotion;
