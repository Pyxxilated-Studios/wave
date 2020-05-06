import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilPantsImg from "./mithril-pants.png";

const MithrilPants: Armour = {
    name: "Mithril Pants",
    type: "legs",
    effects: {
        defenceBonus: 20,
    },
    image: MithrilPantsImg,
    value: 200,
};

export default MithrilPants;
