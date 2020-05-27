import { Armour } from "../../../../../types";

import LeatherPantsImg from "./leather-pants.png";

const LeatherPants: Armour = {
    name: "Leather Pants",
    type: "armour",
    kind: "legs",
    effects: { "defence bonus": 4 },
    image: LeatherPantsImg,
    price: 35,
};

export default LeatherPants;
