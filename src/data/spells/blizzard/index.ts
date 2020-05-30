// Credit: https://kvsr.itch.io/ice-shard
import { Spell } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from "../../../constants";

import BlizzardSprite from "./Blizzard.png";
import BlizzardImage from "./Blizzard-image.png";

const Blizzard: Spell = {
    name: "Blizzard",
    type: "spell",
    target: "enemy",
    kind: "combat",
    range: SIGHT_RADIUS,
    manaCost: 52,
    unlockLevel: 17,
    animationFrames: 5,
    image: BlizzardImage,
    sprite: BlizzardSprite,
    description: "I told you to chill out! You should have listened...",
    effects: [
        {
            effect: "changeAI",
            to: "frozen",
            turns: AI_CHANGE_TURNS * 2,
            description: "freeze",
        },
        {
            effect: "damage",
            dice: "2d6",
        },
    ],
};

export default Blizzard;
