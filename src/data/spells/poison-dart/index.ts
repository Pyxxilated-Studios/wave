import { Spell } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS, TURNS_FOR_POISON, POISON_DAMAGE } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import PoisonDartSprite from "./PoisonDart.png";
import PoisonDartImage from "./PoisonDart-image.png";

const PoisonDart: Spell = {
    name: "Poison Dart",
    kind: "spell",
    target: "enemy",
    type: "combat",
    range: SIGHT_RADIUS,
    manaCost: 21,
    unlockLevel: 5,
    animationFrames: 5,
    image: PoisonDartImage,
    sprite: PoisonDartSprite,
    description: "Life is easier when no-one else is around.",
    effects: [
        { effect: "damage", dice: "2d4" },
        {
            effect: "changeAI",
            to: "poisoned",
            turns: AI_CHANGE_TURNS * TURNS_FOR_POISON,
            description: "poison",
            extraEffect: { effect: "damage over time", dice: POISON_DAMAGE, turns: TURNS_FOR_POISON },
        },
    ],
};

export default PoisonDart;
