import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import FungiBulbSprite from "./fungi-bulb.png";

const FungiBulb: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 16,
    maxHealth: 16,
    attackValue: "2d10 + 7",
    defence: 2,
    dice: "1d6",
    experience: 38,
    type: "fungi bulb",
    sprite: { [Direction.West]: FungiBulbSprite, [Direction.East]: FungiBulbSprite },
    ai: "suicidal",
    originalAI: "suicidal",
    direction: Direction.West,
    aiTurns: 0,
};

export default FungiBulb;
