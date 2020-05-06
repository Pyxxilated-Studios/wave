import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilBootsImg from "./mithril-boots.png";

const MithrilBoots: Armour = {
    name: "Mithril Boots",
    type: "boots",
    effects: {
        defenceBonus: 10,
    },
    image: MithrilBootsImg,
    value: 130,
};

export default MithrilBoots;
