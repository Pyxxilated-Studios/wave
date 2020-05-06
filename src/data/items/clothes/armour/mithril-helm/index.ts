import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilHelmImg from "./mithril-helm.png";

const MithrilHelm: Armour = {
    name: "Mithril Helm",
    type: "helmet",
    effects: {
        defenceBonus: 10,
    },
    image: MithrilHelmImg,
    value: 100,
};

export default MithrilHelm;
