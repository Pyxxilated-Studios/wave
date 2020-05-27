import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import BrownStaffImg from "./brown-staff.png";

const BrownStaff: Weapon = {
    name: "Brown Staff",
    type: "weapon",
    kind: "magic",
    effects: {
        "mana bonus": 3,
    },
    range: 1,
    damage: "1d4 + 1",
    image: BrownStaffImg,
    price: 35,
};

export default BrownStaff;
