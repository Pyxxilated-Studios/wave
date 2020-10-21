import { Monster, Direction, Point } from "../../../types";

// Credit: Made on www.pixelart.com by Kelvin Ngor
import BatSprite from "./bat.png";

const Bat: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 10,
    maxHealth: 10,
    attackValue: "1d4 + 4",
    defence: 0,
    dice: "1d4",
    experience: 14,
    type: "bat",
    sprite: { [Direction.West]: BatSprite, [Direction.East]: BatSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Bat;
