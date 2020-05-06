import { Weapon } from "../../../../../types";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import CrossbowImg from "./crossbow.png";
import { SIGHT_RADIUS } from "../../../../../constants";

const Crossbow: Weapon = {
    name: "Crossbow",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "4d8 + 4",
    image: CrossbowImg,
    projectile: {
        name: "bolt",
        target: "enemy",
        animationFrames: 560 / 40,
        sprite: "",
    },
    value: 666,
};

export default Crossbow;
