import { ConsumableItem } from "../../../../../types";

import HealthPotionImage from "./health-potion.png";

const HealthPotion: ConsumableItem = {
    name: "Health Potion",
    type: "potion",
    kind: "health",
    consumeEffect: { healthRestore: 15 },
    image: HealthPotionImage,
    value: 40,
};

export default HealthPotion;
