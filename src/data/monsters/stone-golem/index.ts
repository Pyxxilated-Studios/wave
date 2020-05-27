import { Monster, Direction } from "../../../types";

import GolemSprite from "./stone-golem.png";

const StoneGolem: Monster = {
    kind: "monster",
    id: "0",
    location: { x: 0, y: 0 },
    visible: false,
    health: 30,
    maxHealth: 30,
    attackValue: "2d10 + 5",
    defence: 5,
    dice: "2d8",
    exp: 200,
    type: "stone golem",
    sprite: { [Direction.West]: GolemSprite, [Direction.East]: GolemSprite },
    ai: "normal",
    originalAI: "normal",
    direction: Direction.West,
    aiTurns: 0,
};

export default StoneGolem;
