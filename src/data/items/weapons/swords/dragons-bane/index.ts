import { Weapon } from "../../../../../types";

import DragonsBaneImg from "./dragons-bane.png";

const DragonsBane: Weapon = {
    name: "Dragons Bane",
    type: "weapon",
    kind: "melee",
    range: 1,
    damage: "2d10 + 2",
    bonus: "dragon::2.5",
    image: DragonsBaneImg,
    value: 300,
};

export default DragonsBane;
