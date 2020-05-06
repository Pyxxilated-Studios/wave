import { Weapon } from "../../../../../types";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BowImg from "./bow.png";
import { SIGHT_RADIUS } from "../../../../../constants";

const Bow: Weapon = {
    name: "Bow",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "2d10 + 2",
    image: BowImg,
    projectile: {
        name: "arrow",
        target: "enemy",
        animationFrames: 560 / 40,
        sprite: "",
    },
    value: 300,
};

export default Bow;
