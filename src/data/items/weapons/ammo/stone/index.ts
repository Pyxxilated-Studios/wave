import { Ammo, Target } from "../../../../../types";

import StoneImage from "./stone.png";

const Stone: Ammo = {
    name: "stone",
    type: "ammo",
    target: Target.Enemy,
    image: StoneImage,
    sprite: StoneImage,
    animationFrames: 14,
    useText: "shot a",
};

export default Stone;
