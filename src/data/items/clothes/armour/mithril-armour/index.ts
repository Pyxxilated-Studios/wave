import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilArmourImg from "./mithril-armour.png";

const MithrilArmour: Armour = {
    name: "Mithril Armour",
    type: "armour",
    kind: "body",
    effects: {
        "defence bonus": 25,
    },
    image: MithrilArmourImg,
    price: 250,
};

export default MithrilArmour;
