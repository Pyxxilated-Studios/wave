import { ConsumableItem } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-potions-pack-1/
import DivineHealthPotionImage from "./divine-health-potion.png";

const DivineHealthPotion: ConsumableItem = {
    name: "Divine Health Potion",
    type: "potion",
    kind: "health",
    consumeEffect: { healthRestore: 100 },
    image: DivineHealthPotionImage,
    value: 180,
};

export default DivineHealthPotion;
