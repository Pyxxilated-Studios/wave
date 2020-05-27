// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import FireSpiritSprite from "./fire-spirit.png";
import Fireball from "../../spells/fireball";
import { Monster, Direction } from "../../../types";

const FireSpirit: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 30,
    maxHealth: 30,
    attackValue: "1d20 + 24",
    defence: 2,
    dice: "3d4",
    exp: 180,
    type: "fire spirit",
    sprite: { [Direction.West]: FireSpiritSprite, [Direction.East]: FireSpiritSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: Fireball,
    direction: Direction.West,
    aiTurns: 0,
};

export default FireSpirit;
