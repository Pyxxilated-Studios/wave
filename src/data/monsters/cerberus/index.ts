import { Monster, Direction, Point } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import CerberusSprite from "./cerberus.png";

const Cerberus: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 100,
    maxHealth: 100,
    attackValue: "4d20 + 20",
    defence: 12,
    dice: "3d20",
    experience: 1000,
    type: "cerberus",
    sprite: { [Direction.West]: CerberusSprite, [Direction.East]: CerberusSprite },
    ai: "boss",
    originalAI: "boss",
    direction: Direction.West,
    aiTurns: 0,
};

export default Cerberus;
