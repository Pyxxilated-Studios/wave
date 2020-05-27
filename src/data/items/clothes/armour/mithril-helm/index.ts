import { Armour } from "../../../../../types";

// Credit: https://craftpix.net/freebies/free-game-icons-of-fantasy-knight-armor-pack-11/
import MithrilHelmImg from "./mithril-helm.png";

const MithrilHelm: Armour = {
    name: "Mithril Helm",
    type: "armour",
    kind: "helmet",
    effects: {
        "defence bonus": 10,
    },
    image: MithrilHelmImg,
    price: 100,
};

export default MithrilHelm;
