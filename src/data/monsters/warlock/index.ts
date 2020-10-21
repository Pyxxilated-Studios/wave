import { Monster, Direction, Point } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import WarlockSprite from "./warlock.png";
import Fireball from "../../spells/fireball";

const Warlock: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 30,
    maxHealth: 30,
    attackValue: "2d20 + 20",
    defence: 2,
    dice: "3d6+4",
    experience: 320,
    type: "warlock",
    sprite: { [Direction.West]: WarlockSprite, [Direction.East]: WarlockSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: Fireball,
    direction: Direction.West,
    aiTurns: 0,
};

export default Warlock;
