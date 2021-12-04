import { Monster, Direction, Point } from "../../../types";

import GoblinSprite from "./goblin.png";

const Goblin: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 14,
    maxHealth: 14,
    attackValue: "3d4 + 4",
    defence: 3,
    dice: "1d6",
    experience: 30,
    type: "goblin",
    sprite: { [Direction.West]: GoblinSprite, [Direction.East]: GoblinSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Goblin;
