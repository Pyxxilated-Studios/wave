import { ConsumableItem } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-potions-pack-1/
import MightyHealthPotionImage from "./mighty-health-potion.png";

const MightyHealthPotion: ConsumableItem = {
    name: "Mighty Health Potion",
    type: "potion",
    kind: "health",
    consumeEffect: { healthRestore: 50 },
    image: MightyHealthPotionImage,
    price: 90,
};

export default MightyHealthPotion;
