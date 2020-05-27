import { Armour } from "../../../../../types";

import LeatherGlovesImg from "./leather-gloves.png";

const LeatherGloves: Armour = {
    name: "Leather Gloves",
    type: "armour",
    kind: "gloves",
    effects: { "defence bonus": 2 },
    image: LeatherGlovesImg,
    price: 25,
};

export default LeatherGloves;
