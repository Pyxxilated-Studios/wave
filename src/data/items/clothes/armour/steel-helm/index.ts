import { Armour } from "../../../../../types";

import SteelHelmImg from "./steel-helm.png";

const SteelHelm: Armour = {
    name: "Steel Helm",
    type: "armour",
    kind: "helmet",
    effects: { "defence bonus": 10 },
    image: SteelHelmImg,
    price: 100,
};

export default SteelHelm;
