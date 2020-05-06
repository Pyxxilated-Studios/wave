import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilArmourImg from "./mithril-armour.png";

const MithrilArmour: Armour = {
    name: "Mithril Armour",
    type: "body",
    effects: {
        defenceBonus: 25,
    },
    image: MithrilArmourImg,
    value: 250,
};

export default MithrilArmour;
