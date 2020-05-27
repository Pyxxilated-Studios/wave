import { Weapon } from "../../../../../types";
import { SIGHT_RADIUS } from "../../../../../constants";

// Credit: https://opengameart.org/content/dungeon-crawl-32x32-tiles-supplemental
import BowImg from "./bow.png";
import Arrow from "../../ammo/arrow";

const MidnightsFury: Weapon = {
    name: "Midnight's Fury",
    type: "weapon",
    kind: "ranged",
    effects: {},
    range: SIGHT_RADIUS,
    damage: "3d10 + 4",
    image: BowImg,
    projectile: Arrow,
    price: 666,
};

export default MidnightsFury;
