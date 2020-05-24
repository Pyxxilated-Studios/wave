import { Weapon } from "../../../../../types";
import { SIGHT_RADIUS } from "../../../../../constants";

// Credit: https://shikashiassets.itch.io/shikashis-fantasy-icons-pack
import BoomerangImg from "./boomerang.png";
import BoomerangAmmo from "../../ammo/boomerang";

const Boomerang: Weapon = {
    name: "Boomerang",
    type: "weapon",
    kind: "ranged",
    range: SIGHT_RADIUS,
    damage: "1d8 + 2",
    image: BoomerangImg,
    projectile: BoomerangAmmo,
    value: 35,
};

export default Boomerang;
