import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import PumpkinGhostSprite from "./pumpkin-ghost.png";
import Pumpkin from "../../items/weapons/ammo/pumpkin";

const PumpkinGhost: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 35,
    maxHealth: 35,
    attackValue: "4d10 + 25",
    defence: 5,
    dice: "1d20+8",
    exp: 370,
    type: "pumpkin ghost",
    sprite: { [Direction.West]: PumpkinGhostSprite, [Direction.East]: PumpkinGhostSprite },
    ai: "ranged",
    originalAI: "ranged",
    projectile: Pumpkin,
    direction: Direction.West,
    aiTurns: 0,
};

export default PumpkinGhost;
