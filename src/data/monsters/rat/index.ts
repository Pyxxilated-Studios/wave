import { Monster, Direction, Point } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import RatSprite from "./rat.png";
import RatFloppedSprite from "./rat-flopped.png";

const Rat: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 6,
    maxHealth: 6,
    attackValue: "1d4",
    defence: 0,
    dice: "1d4",
    experience: 8,
    type: "rat",
    sprite: { [Direction.West]: RatSprite, [Direction.East]: RatFloppedSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Rat;
