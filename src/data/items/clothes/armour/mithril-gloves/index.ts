import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilGlovesImg from "./mithril-gloves.png";

const MithrilGloves: Armour = {
    name: "Mithril Gloves",
    type: "armour",
    kind: "gloves",
    effects: {
        "defence bonus": 15,
    },
    image: MithrilGlovesImg,
    price: 150,
};

export default MithrilGloves;
