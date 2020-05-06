import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import TealStaffImg from "./teal-staff.png";

const TealStaff: Weapon = {
    name: "Teal Staff",
    type: "weapon",
    kind: "magic",
    effects: {
        manaBonus: 7,
    },
    range: 1,
    damage: "1d4 + 3",
    image: TealStaffImg,
    value: 45,
};

export default TealStaff;
