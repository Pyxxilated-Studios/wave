import { Armour } from "../../../../../types";

import IronHelmImg from "./iron-helm.png";

const IronHelm: Armour = {
    name: "Iron Helm",
    type: "armour",
    kind: "helmet",
    effects: {
        "defence bonus": 9,
    },
    image: IronHelmImg,
    price: 90,
};

export default IronHelm;
