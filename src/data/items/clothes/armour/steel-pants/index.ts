import { Armour } from "../../../../../types";

import SteelPantsImg from "./steel-pants.png";

const SteelPants: Armour = {
    name: "Steel Pants",
    type: "armour",
    kind: "legs",
    effects: { "defence bonus": 12 },
    image: SteelPantsImg,
    price: 120,
};

export default SteelPants;
