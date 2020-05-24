import SaphireRingImg from "./saphire-ring.png";
import { Armour } from "../../../../../types";

const SaphireRing: Armour = {
    name: "Saphire Ring",
    type: "ring",
    effects: {
        defenceBonus: 10,
        healthBonus: 15,
        manaBonus: 10,
    },
    image: SaphireRingImg,
    value: 150,
};

export default SaphireRing;
