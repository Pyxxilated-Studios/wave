import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import RedStaffImg from "./red-staff.png";

const RedStaff: Weapon = {
    name: "Red Staff",
    type: "weapon",
    kind: "magic",
    effects: {
        manaBonus: 5,
    },
    range: 1,
    damage: "1d4 + 2",
    image: RedStaffImg,
    value: 45,
};

export default RedStaff;
