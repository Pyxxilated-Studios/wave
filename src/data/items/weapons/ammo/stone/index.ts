import { Ammo } from "../../../../../types";

import StoneImage from "./stone.png";

const Stone: Ammo = {
    name: "stone",
    kind: "ammo",
    target: "enemy",
    image: StoneImage,
    sprite: StoneImage,
    animationFrames: 14,
    useText: "shot a",
};

export default Stone;
