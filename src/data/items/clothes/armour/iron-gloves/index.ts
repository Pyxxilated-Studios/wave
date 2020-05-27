import { Armour } from "../../../../../types";

import IronGlovesImg from "./iron-gloves.png";

const IronGloves: Armour = {
    name: "Iron Gloves",
    type: "armour",
    kind: "gloves",
    effects: {
        "defence bonus": 5,
    },
    image: IronGlovesImg,
    price: 50,
};

export default IronGloves;
