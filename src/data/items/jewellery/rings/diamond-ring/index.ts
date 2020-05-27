import { Armour } from "../../../../../types";

import DiamondRingImg from "./diamond-ring.png";

const DiamondRing: Armour = {
    name: "Diamond Ring",
    type: "armour",
    kind: "ring",
    effects: {
        "defence bonus": 10,
    },
    image: DiamondRingImg,
    price: 150,
};

export default DiamondRing;
