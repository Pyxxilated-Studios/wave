import { Ammo } from "../../../../../types";

import BoltImage from "./bolt.png";

const Bolt: Ammo = {
    name: "bolt",
    kind: "ammo",
    target: "enemy",
    image: BoltImage,
    sprite: BoltImage,
    animationFrames: 14,
    useText: "discharged a",
};

export default Bolt;
