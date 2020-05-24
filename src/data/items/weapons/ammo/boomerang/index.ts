import BoomerangAnimated from "./boomerang-animated.png";
import { Projectile } from "../../../../../types";

const BoomerangAmmo: Projectile = {
    name: "boomerang",
    target: "enemy",
    sprite: BoomerangAnimated,
    animationFrames: 14,
    useText: "threw a",
};

export default BoomerangAmmo;
