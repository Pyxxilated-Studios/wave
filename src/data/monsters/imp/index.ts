import { Monster, Direction } from "../../../types";

import ImpSprite from "./imp.png";

const Imp: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 40,
    maxHealth: 40,
    attackValue: "2d8 + 18",
    defence: 2,
    dice: "3d4 + 4",
    experience: 160,
    type: "imp",
    sprite: { [Direction.West]: ImpSprite, [Direction.East]: ImpSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Imp;
