import { ConsumableItem } from "../../../../../types";

import GreatHealthPotionImage from "./great-health-potion.png";

const GreatHealthPotion: ConsumableItem = {
    name: "Great Health Potion",
    type: "potion",
    kind: "health",
    consumeEffect: { healthRestore: 30 },
    image: GreatHealthPotionImage,
    price: 60,
};

export default GreatHealthPotion;
