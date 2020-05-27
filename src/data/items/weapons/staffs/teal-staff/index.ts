import { Weapon } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import TealStaffImg from "./teal-staff.png";

const TealStaff: Weapon = {
    name: "Teal Staff",
    type: "weapon",
    kind: "magic",
    effects: {
        "mana bonus": 7,
    },
    range: 1,
    damage: "1d4 + 3",
    image: TealStaffImg,
    price: 45,
};

export default TealStaff;
