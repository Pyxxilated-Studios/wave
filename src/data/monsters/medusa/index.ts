import { Monster, Direction } from "../../../types";

// Credit: https://mobilegamegraphics.itch.io/adventure-game-kit
import MedusaSprite from "./medusa.png";
import MedusaFloppedSprite from "./medusa-flopped.png";

const Medusa: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 40,
    maxHealth: 40,
    attackValue: "5d6 + 25",
    defence: 5,
    dice: "1d20 + 4",
    experience: 350,
    type: "medusa",
    sprite: { [Direction.West]: MedusaFloppedSprite, [Direction.East]: MedusaSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default Medusa;
