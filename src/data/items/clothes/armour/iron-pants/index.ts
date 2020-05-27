import { Armour } from "../../../../../types";

import IronPantsImg from "./iron-pants.png";

const IronPants: Armour = {
    name: "Iron Pants",
    type: "armour",
    kind: "legs",
    effects: {
        "defence bonus": 10,
    },
    image: IronPantsImg,
    price: 100,
};

export default IronPants;
