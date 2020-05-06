import { Weapon } from "../../../../../types";

import LichBaneImg from "./lich-bane.png";

const LichBane: Weapon = {
    name: "Lich Bane",
    type: "weapon",
    kind: "melee",
    range: 1,
    damage: "4d8 + 4",
    bonus: "lich::2",
    image: LichBaneImg,
    value: 666,
};

export default LichBane;
