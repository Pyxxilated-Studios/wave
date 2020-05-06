import { Weapon } from "../../../../../types";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import SlingshotImg from "./slingshot.png";
import { SIGHT_RADIUS } from "../../../../../constants";

const Slingshot: Weapon = {
    name: "Slingshot",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "2d8",
    image: SlingshotImg,
    projectile: {
        name: "stone",
        target: "enemy",
        animationFrames: 560 / 40,
        sprite: "",
    },
    value: 110,
};

export default Slingshot;
