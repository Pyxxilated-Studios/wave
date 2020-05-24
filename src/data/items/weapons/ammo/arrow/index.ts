import ArrowImg from "./arrow.png";
import { Projectile } from "../../../../../types";

const Arrow: Projectile = {
    name: "arrow",
    target: "enemy",
    sprite: ArrowImg,
    animationFrames: 14,
    useText: "fired an",
};

export default Arrow;
