import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import GasCloudSprite from "./gas-cloud.png";

const GasCloud: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 10,
    maxHealth: 10,
    attackValue: "2d10 + 5",
    defence: 1,
    dice: "1d4",
    exp: 35,
    type: "gas cloud",
    sprite: { [Direction.West]: GasCloudSprite, [Direction.East]: GasCloudSprite },
    ai: "suicidal",
    originalAI: "suicidal",
    direction: Direction.West,
    aiTurns: 0,
};

export default GasCloud;
