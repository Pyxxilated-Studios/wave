import { Monster, Direction } from "../../../types";

// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import PoisonCloudSprite from "./poison-cloud.png";
import PoisonCloudSpell from "../../spells/poison-cloud";

const PoisonCloud: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 30,
    maxHealth: 30,
    attackValue: "2d20 + 10",
    defence: 2,
    dice: "3d4+2",
    exp: 230,
    type: "poison cloud",
    sprite: { [Direction.West]: PoisonCloudSprite, [Direction.East]: PoisonCloudSprite },
    ai: "magical",
    originalAI: "magical",
    projectile: PoisonCloudSpell,
    direction: Direction.West,
    aiTurns: 0,
};

export default PoisonCloud;
