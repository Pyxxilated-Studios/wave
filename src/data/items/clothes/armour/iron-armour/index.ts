import { Armour } from "../../../../../types";

import IronArmourImg from "./iron-armour.png";

const IronArmor: Armour = {
    name: "Iron Armour",
    type: "body",
    effects: {
        defenceBonus: 10,
    },
    image: IronArmourImg,
    value: 90,
};

export default IronArmor;
