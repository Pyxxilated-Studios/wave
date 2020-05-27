import { Armour } from "../../../../../types";

import IronBootsImg from "./iron-boots.png";

const IronBoots: Armour = {
    name: "Iron Boots",
    type: "armour",
    kind: "boots",
    effects: {
        "defence bonus": 4,
    },
    image: IronBootsImg,
    price: 60,
};

export default IronBoots;
