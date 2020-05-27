import { Weapon } from "../../../../../types";
import { SIGHT_RADIUS } from "../../../../../constants";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import SlingshotImg from "./slingshot.png";
import Stone from "../../ammo/stone";

const Slingshot: Weapon = {
    name: "Slingshot",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "2d8",
    image: SlingshotImg,
    projectile: Stone,
    price: 110,
};

export default Slingshot;
