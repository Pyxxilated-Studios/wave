import { Weapon } from "../../../../../types";

import RustySwordImg from "./rusty-sword.png";

const RustySword: Weapon = {
    name: "Rusty Sword",
    type: "weapon",
    kind: "melee",
    range: 1,
    damage: "1d4 + 2",
    image: RustySwordImg,
    price: 10,
};

export default RustySword;
