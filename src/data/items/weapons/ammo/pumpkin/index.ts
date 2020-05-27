import { Ammo } from "../../../../../types";

import PumpkinImage from "./pumpkin-image.png";

const Pumpkin: Ammo = {
    name: "pumpkin",
    kind: "ammo",
    target: "enemy",
    image: PumpkinImage,
    sprite: PumpkinImage,
    animationFrames: 14,
    useText: "threw a",
};

export default Pumpkin;
