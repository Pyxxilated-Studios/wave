import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import BlackOrcSprite from "./black-orc.png";

const BlackOrc: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 55,
    maxHealth: 55,
    attackValue: "5d4 + 35",
    defence: 5,
    dice: "3d8",
    exp: 280,
    type: "black orc",
    sprite: { [Direction.West]: BlackOrcSprite, [Direction.East]: BlackOrcSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default BlackOrc;
