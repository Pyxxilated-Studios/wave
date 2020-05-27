import { Monster, Direction } from "../../../types";

import LichSprite from "./lich.png";
import LichFloppedSprite from "./lich-flopped.png";

const Lich: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 80,
    maxHealth: 80,
    attackValue: "2d20+10",
    defence: 12,
    dice: "2d8 + 10",
    exp: 1000,
    type: "lich",
    sprite: { [Direction.West]: LichSprite, [Direction.East]: LichFloppedSprite },
    ai: "boss",
    originalAI: "boss",
    direction: Direction.West,
    aiTurns: 0,
};

export default Lich;
