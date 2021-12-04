import { Direction, Monster, Point } from "../../../types";

// Credit: Made on www.pixelart.com by Kelvin Ngor
import WolfSprite from "./wolf.png";
import WolfFloppedSprite from "./wolf-flopped.png";

const Wolf: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 10,
    maxHealth: 10,
    attackValue: "2d4 + 3",
    defence: 1,
    dice: "1d4 + 1",
    experience: 22,
    type: "wolf",
    sprite: { [Direction.West]: WolfSprite, [Direction.East]: WolfFloppedSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Wolf;
