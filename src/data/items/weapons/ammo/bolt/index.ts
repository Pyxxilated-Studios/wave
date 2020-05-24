import BoltImg from "./bolt.png";
import { Projectile } from "../../../../../types";

const Bolt: Projectile = {
    name: "bolt",
    target: "enemy",
    sprite: BoltImg,
    animationFrames: 14,
    useText: "discharged a",
};

export default Bolt;
