import { Ammo } from "../../../../../types";

import BoomerangImage from "./boomerang.png";
import BoomerangAnimated from "./boomerang-animated.png";

const BoomerangAmmo: Ammo = {
    name: "boomerang",
    kind: "ammo",
    target: "enemy",
    image: BoomerangImage,
    sprite: BoomerangAnimated,
    animationFrames: 14,
    useText: "threw a",
};

export default BoomerangAmmo;
