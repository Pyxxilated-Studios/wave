import { Ammo, Target } from "../../../../../types";

import BoomerangImage from "./boomerang.png";
import BoomerangAnimated from "./boomerang-animated.png";

const BoomerangAmmo: Ammo = {
    name: "boomerang",
    type: "ammo",
    target: Target.Enemy,
    image: BoomerangImage,
    sprite: BoomerangAnimated,
    animationFrames: 14,
    useText: "threw a",
};

export default BoomerangAmmo;
