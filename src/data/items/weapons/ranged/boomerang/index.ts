import { Weapon } from "../../../../../types";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BoomerangImg from "./boomerang.png";
import BoomerangAnimated from "./boomerang-animated.png";
import { SIGHT_RADIUS } from "../../../../../constants";

const Boomerang: Weapon = {
    name: "Boomerang",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "1d8 + 2",
    image: BoomerangImg,
    projectile: {
        name: "boomerang",
        target: "enemy",
        animationFrames: 560 / 40,
        sprite: BoomerangAnimated,
    },
    value: 35,
};

export default Boomerang;
