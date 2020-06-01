import { Ammo, Target } from "../../../../../types";

import PumpkinImage from "./pumpkin-image.png";

const Pumpkin: Ammo = {
    name: "pumpkin",
    type: "ammo",
    target: Target.Enemy,
    image: PumpkinImage,
    sprite: PumpkinImage,
    animationFrames: 14,
    useText: "threw a",
};

export default Pumpkin;
