//Credit: https://kyrise.itch.io/kyrises-free-16x16-rpg-icon-pack
import PeaImg from "./pea.png";
import { Projectile } from "../../../../../types";

const Pea: Projectile = {
    name: "pea",
    target: "enemy",
    sprite: PeaImg,
    animationFrames: 14,
    useText: "shot a giant",
};

export default Pea;
