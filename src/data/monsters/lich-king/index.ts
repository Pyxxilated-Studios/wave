import { Monster, Direction } from "../../../types";

import LichSprite from "./lich.png";
import LichFloppedSprite from "./lich-flopped.png";

const LichKing: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 100,
    maxHealth: 100,
    attackValue: "3d20 + 30",
    defence: 12,
    dice: "1d20 + 10",
    experience: 1000,
    type: "lich king",
    sprite: { [Direction.West]: LichSprite, [Direction.East]: LichFloppedSprite },
    ai: "boss",
    originalAI: "boss",
    direction: Direction.West,
    aiTurns: 0,
};

export default LichKing;
