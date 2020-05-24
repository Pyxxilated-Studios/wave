import StoneImg from "./stone.png";
import { Projectile } from "../../../../../types";

const Stone: Projectile = {
    name: "stone",
    target: "enemy",
    sprite: StoneImg,
    animationFrames: 14,
    useText: "shot a",
};

export default Stone;
