import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilPantsImg from "./mithril-pants.png";

const MithrilPants: Armour = {
    name: "Mithril Pants",
    type: "armour",
    kind: "legs",
    effects: {
        "defence bonus": 20,
    },
    image: MithrilPantsImg,
    price: 200,
};

export default MithrilPants;
