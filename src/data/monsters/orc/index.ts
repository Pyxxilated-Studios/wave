import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import OrcSprite from "./orc.png";

const Orc: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 20,
    maxHealth: 20,
    attackValue: "5d4 + 8",
    defence: 4,
    dice: "1d6 + 2",
    experience: 44,
    type: "orc",
    sprite: { [Direction.West]: OrcSprite, [Direction.East]: OrcSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Orc;
