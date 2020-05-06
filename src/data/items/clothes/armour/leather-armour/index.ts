import { Armour } from "../../../../../types";

import LeatherArmourImg from "./leather-armour.png";

const LeatherArmour: Armour = {
    name: "Leather Armour",
    type: "body",
    effects: { defenceBonus: 5 },
    image: LeatherArmourImg,
    value: 40,
};

export default LeatherArmour;
