import { Monster, Direction, Point } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import PlanteraSprite from "./plantera.png";
import Pea from "../../items/weapons/ammo/pea";

const Plantera: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 40,
    maxHealth: 40,
    attackValue: "3d20 + 21",
    defence: 4,
    dice: "3d8+2",
    experience: 330,
    type: "Plantera",
    sprite: { [Direction.West]: PlanteraSprite, [Direction.East]: PlanteraSprite },
    ai: "ranged",
    originalAI: "ranged",
    projectile: Pea,
    direction: Direction.West,
    aiTurns: 0,
};

export default Plantera;
