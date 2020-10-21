import { Monster, Direction, Point } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import WaterSpiritSprite from "./water-spirit.png";
import IceShard from "../../spells/ice-shard";

const WaterSpirit: Monster = {
    kind: "monster",
    id: "0",
    location: new Point(0, 0),
    visible: false,
    health: 10,
    maxHealth: 10,
    attackValue: "2d4 + 6",
    defence: 1,
    dice: "1d4",
    experience: 28,
    type: "water spirit",
    sprite: { [Direction.West]: WaterSpiritSprite, [Direction.East]: WaterSpiritSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: IceShard,
    direction: Direction.West,
    aiTurns: 0,
};

export default WaterSpirit;
