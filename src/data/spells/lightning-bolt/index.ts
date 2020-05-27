import { Spell } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS, SHOCK_DAMAGE } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import LightningBoltSprite from "./LightningBolt.png";
import LightningBoltImage from "./LightningBolt-image.png";

const LightningBolt: Spell = {
    name: "Lightning Bolt",
    kind: "spell",
    target: "enemy",
    type: "combat",
    range: SIGHT_RADIUS,
    manaCost: 26,
    unlockLevel: 8,
    animationFrames: 5,
    image: LightningBoltImage,
    sprite: LightningBoltSprite,
    description: "Ever wanted to be a Greek god? Well, this is all you get buddy.",
    effects: [
        {
            effect: "changeAI",
            to: "shocked",
            turns: AI_CHANGE_TURNS,
            description: "shock",
            chance: {
                // 25% Chance of it proc'ing
                proc: (): boolean => Math.floor(Math.random() * 99) + 1 < 25,
                description: "25%",
                effects: [{ effect: "damage over time", dice: SHOCK_DAMAGE, turns: AI_CHANGE_TURNS }],
            },
        },
        {
            effect: "damage",
            dice: "1d6 + 3",
        },
    ],
};

export default LightningBolt;
