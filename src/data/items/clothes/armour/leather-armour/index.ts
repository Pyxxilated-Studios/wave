import { Armour } from "../../../../../types";

import LeatherArmourImg from "./leather-armour.png";

const LeatherArmour: Armour = {
    name: "Leather Armour",
    type: "armour",
    kind: "body",
    effects: { "defence bonus": 5 },
    image: LeatherArmourImg,
    price: 40,
};

export default LeatherArmour;
