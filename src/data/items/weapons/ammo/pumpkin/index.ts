import PumpkinImage from "./pumpkin-image.png";
import { Projectile } from "../../../../../types";

const Pumpkin: Projectile = {
    name: "pumpkin",
    target: "enemy",
    sprite: PumpkinImage,
    animationFrames: 14,
    useText: "threw a",
};

export default Pumpkin;
