import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import BlackStaffImg from "./black-staff.png";

const BlackStaff: Weapon = {
    name: "Broom",
    type: "weapon",
    kind: "magic",
    effects: {
        manaBonus: 1,
    },
    range: 1,
    damage: "1d4",
    image: BlackStaffImg,
    value: 25,
};

export default BlackStaff;
