import { Monster, Direction } from "../../../types";

import SalamanderSprite from "./salamander.png";
import Stone from "../../items/weapons/ammo/stone";

const Salamander: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 12,
    maxHealth: 12,
    attackValue: "1d10 + 5",
    defence: 1,
    dice: "1d4 + 1",
    experience: 25,
    type: "salamander",
    sprite: { [Direction.West]: SalamanderSprite, [Direction.East]: SalamanderSprite },
    ai: "ranged",
    originalAI: "ranged",
    projectile: Stone,
    direction: Direction.West,
    aiTurns: 0,
};

export default Salamander;
