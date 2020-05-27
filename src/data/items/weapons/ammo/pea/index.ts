import { Ammo } from "../../../../../types";

//Credit: https://kyrise.itch.io/kyrises-free-16x16-rpg-icon-pack
import PeaImage from "./pea.png";

const Pea: Ammo = {
    name: "pea",
    kind: "ammo",
    target: "enemy",
    image: PeaImage,
    sprite: PeaImage,
    animationFrames: 14,
    useText: "shot a giant",
};

export default Pea;
