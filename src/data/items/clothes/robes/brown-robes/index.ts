import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import BrownRobesImg from "./brown-robes.png";

const BrownRobes: Armour = {
    name: "Brown Robes",
    type: "armour",
    kind: "body",
    effects: {
        "mana bonus": 3,
    },
    image: BrownRobesImg,
    price: 35,
};

export default BrownRobes;
