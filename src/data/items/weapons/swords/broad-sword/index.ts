import { Weapon } from "../../../../../types";

import BroadSwordImg from "./broad-sword.png";

const BroadSword: Weapon = {
    name: "Broad Sword",
    type: "weapon",
    kind: "melee",
    range: 1,
    damage: "2d8",
    image: BroadSwordImg,
    price: 110,
};

export default BroadSword;
