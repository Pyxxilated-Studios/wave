import { Weapon } from "../../../../../types";
import { SIGHT_RADIUS } from "../../../../../constants";

// Credit: https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
import CrossbowImg from "./crossbow.png";
import Bolt from "../../ammo/bolt";

const PhantasmCrossbow: Weapon = {
    name: "Phantasm Crossbow",
    type: "weapon",
    kind: "ranged",
    effects: {},
    range: SIGHT_RADIUS,
    damage: "2d10 + 4",
    image: CrossbowImg,
    projectile: Bolt,
    price: 300,
};

export default PhantasmCrossbow;
