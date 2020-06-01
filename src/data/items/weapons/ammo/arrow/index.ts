import { Ammo, Target } from "../../../../../types";

import ArrowImage from "./arrow.png";

const Arrow: Ammo = {
    name: "arrow",
    type: "ammo",
    target: Target.Enemy,
    image: ArrowImage,
    sprite: ArrowImage,
    animationFrames: 14,
    useText: "fired an",
};

export default Arrow;
