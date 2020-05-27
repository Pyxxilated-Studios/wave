import SaphireRingImg from "./saphire-ring.png";
import { Armour } from "../../../../../types";

const SaphireRing: Armour = {
    name: "Saphire Ring",
    type: "armour",
    kind: "ring",
    effects: {
        "defence bonus": 10,
        "health bonus": 15,
        "mana bonus": 10,
    },
    image: SaphireRingImg,
    price: 150,
};

export default SaphireRing;
