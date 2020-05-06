import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilGlovesImg from "./mithril-gloves.png";

const MithrilGloves: Armour = {
    name: "Mithril Gloves",
    type: "gloves",
    effects: {
        defenceBonus: 15,
    },
    image: MithrilGlovesImg,
    value: 150,
};

export default MithrilGloves;
