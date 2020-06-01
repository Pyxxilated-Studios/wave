import { Ammo, Target } from "../../../../../types";

import BoltImage from "./bolt.png";

const Bolt: Ammo = {
    name: "bolt",
    type: "ammo",
    target: Target.Enemy,
    image: BoltImage,
    sprite: BoltImage,
    animationFrames: 14,
    useText: "discharged a",
};

export default Bolt;
