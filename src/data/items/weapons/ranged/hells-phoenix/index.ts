import { Weapon } from "../../../../../types";
import { SIGHT_RADIUS } from "../../../../../constants";

// Credit: https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
import BowImg from "./bow.png";
import Arrow from "../../ammo/arrow";

const HellsPhoenix: Weapon = {
    name: "Hell's Phoenix",
    type: "weapon",
    kind: "ranged",
    effects: {},
    range: SIGHT_RADIUS,
    damage: "2d8",
    image: BowImg,
    projectile: Arrow,
    price: 110,
};

export default HellsPhoenix;
