import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-fantasy-mage-outfit-pack-7/
import BlackRobesImg from "./black-robes.png";

const BlackRobes: Armour = {
    name: "Black Robes",
    type: "armour",
    kind: "body",
    effects: {
        "mana bonus": 1,
    },
    image: BlackRobesImg,
    price: 25,
};

export default BlackRobes;
