import { Armour } from "../../../../../types";

import IronHelmImg from "./iron-helm.png";

const IronHelm: Armour = {
    name: "Iron Helm",
    type: "helmet",
    effects: {
        defenceBonus: 9,
    },
    image: IronHelmImg,
    value: 90,
};

export default IronHelm;
