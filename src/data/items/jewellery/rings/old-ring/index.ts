import { Armour } from "../../../../../types";

import OldRingImg from "./old-ring.png";

const OldRing: Armour = {
    name: "Old Ring",
    type: "armour",
    kind: "ring",
    effects: {
        "defence bonus": 1,
        "health bonus": 4,
    },
    image: OldRingImg,
    price: 25,
};

export default OldRing;
