import { Spell } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS, SHOCK_DAMAGE } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import ThunderStormSprite from "./ThunderStorm.png";
import ThunderStormImage from "./ThunderStorm-image.png";

const ThunderStorm: Spell = {
    name: "Thunder Storm",
    type: "spell",
    target: "enemy",
    kind: "combat",
    range: SIGHT_RADIUS,
    manaCost: 68,
    unlockLevel: 23,
    animationFrames: 5,
    image: ThunderStormImage,
    sprite: ThunderStormSprite,
    description: "Thunder! Ah! Thunder! Ah! Thunder! Ah!",
    effects: [
        { effect: "damage", dice: "2d6 + 6" },
        {
            effect: "changeAI",
            to: "shocked",
            turns: AI_CHANGE_TURNS * 2,
            description: "shock",
            chance: {
                proc: (): boolean => Math.floor(Math.random() * 99) + 1 < 50,
                description: "50%",
                effects: [
                    {
                        effect: "damage over time",
                        dice: SHOCK_DAMAGE,
                        turns: AI_CHANGE_TURNS * 2,
                    },
                ],
            },
        },
    ],
};

export default ThunderStorm;
