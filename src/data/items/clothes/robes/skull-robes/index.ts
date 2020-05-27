import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import SkullRobesImg from "./skull-robes.png";

const SkullRobes: Armour = {
    name: "Skull Robes",
    type: "armour",
    kind: "body",
    effects: {
        "mana bonus": 9,
    },
    image: SkullRobesImg,
    price: 65,
};

export default SkullRobes;
