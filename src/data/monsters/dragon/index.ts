import { Monster, Direction } from "../../../types";

import DragonSprite from "./dragon.png";
import DragonFloppedSprite from "./dragon-flopped.png";

import Mend from "../../spells/mend";

const Dragon: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 60,
    maxHealth: 60,
    attackValue: "3d10 + 35",
    defence: 8,
    dice: "2d20",
    exp: 400,
    type: "dragon",
    sprite: { [Direction.West]: DragonSprite, [Direction.East]: DragonFloppedSprite },
    ai: "healer",
    originalAI: "healer",
    projectile: Mend,
    direction: Direction.West,
    aiTurns: 0,
};

export default Dragon;
