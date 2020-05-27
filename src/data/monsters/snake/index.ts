import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import SnakeSprite from "./snake.png";
import PoisonDart from "../../spells/poison-dart";

const Snake: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 8,
    maxHealth: 8,
    attackValue: "1d6 + 3",
    defence: 0,
    dice: "1d4",
    exp: 18,
    type: "snake",
    sprite: { [Direction.West]: SnakeSprite, [Direction.East]: SnakeSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: PoisonDart,
    direction: Direction.West,
    aiTurns: 0,
};

export default Snake;
