import { Armour } from "../../../../../types";

import SteelGlovesImg from "./steel-gloves.png";

const SteelGloves: Armour = {
    name: "Steel Gloves",
    type: "armour",
    kind: "gloves",
    effects: { "defence bonus": 6 },
    image: SteelGlovesImg,
    price: 80,
};

export default SteelGloves;
