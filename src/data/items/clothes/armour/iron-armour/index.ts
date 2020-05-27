import { Armour } from "../../../../../types";

import IronArmourImg from "./iron-armour.png";

const IronArmor: Armour = {
    name: "Iron Armour",
    type: "armour",
    kind: "body",
    effects: {
        "defence bonus": 10,
    },
    image: IronArmourImg,
    price: 90,
};

export default IronArmor;
