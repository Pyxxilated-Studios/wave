import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilBootsImg from "./mithril-boots.png";

const MithrilBoots: Armour = {
    name: "Mithril Boots",
    type: "armour",
    kind: "boots",
    effects: {
        "defence bonus": 10,
    },
    image: MithrilBootsImg,
    price: 130,
};

export default MithrilBoots;
