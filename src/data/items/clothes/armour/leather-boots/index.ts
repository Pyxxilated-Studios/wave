import { Armour } from "../../../../../types";

import LeatherBootsImg from "./leather-boots.png";

const LeatherBoots: Armour = {
    name: "Leather Boots",
    type: "armour",
    kind: "boots",
    effects: { "defence bonus": 2 },
    image: LeatherBootsImg,
    price: 25,
};

export default LeatherBoots;
