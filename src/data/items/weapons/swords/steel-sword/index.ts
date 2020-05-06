import { Weapon } from "../../../../../types";

import SteelSwordImg from "./steel-sword.png";

const SteelSword: Weapon = {
    name: "Steel Sword",
    type: "weapon",
    kind: "melee",
    range: 1,
    damage: "1d8 + 2",
    image: SteelSwordImg,
    value: 35,
};

export default SteelSword;
