import { Spell, Target, SpellType, SpellEffectType } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import VoidSprite from "./Void.png";
import VoidImage from "./Void-image.png";

const Void: Spell = {
    name: "Void",
    type: "spell",
    target: Target.Enemy,
    kind: SpellType.Combat,
    range: SIGHT_RADIUS,
    manaCost: 80,
    unlockLevel: 27,
    animationFrames: 5,
    image: VoidImage,
    sprite: VoidSprite,
    description: "This is not the value you were looking for...",
    effects: [
        { effect: SpellEffectType.Damage, dice: "2d8 + 4" },
        { effect: SpellEffectType.ChangeAI, to: "scared", turns: AI_CHANGE_TURNS * 2, description: "scare" },
    ],
};

export default Void;
