import { Armour } from "../../../../../types";

import SteelArmourImg from "./steel-armour.png";

const SteelArmour: Armour = {
    name: "Steel Armour",
    type: "armour",
    kind: "body",
    effects: { "defence bonus": 14 },
    image: SteelArmourImg,
    price: 150,
};

export default SteelArmour;
