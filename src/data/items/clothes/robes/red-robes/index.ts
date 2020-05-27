import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import RedRobesImg from "./red-robes.png";

const RedRobes: Armour = {
    name: "Red Robes",
    type: "armour",
    kind: "body",
    effects: {
        "mana bonus": 5,
    },
    image: RedRobesImg,
    price: 45,
};

export default RedRobes;
