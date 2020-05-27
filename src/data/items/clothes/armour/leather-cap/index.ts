import { Armour } from "../../../../../types";

import LeatherCapImg from "./leather-cap.png";

const LeatherCap: Armour = {
    name: "Leather Cap",
    type: "armour",
    kind: "helmet",
    effects: { "defence bonus": 3 },
    image: LeatherCapImg,
    price: 30,
};

export default LeatherCap;
