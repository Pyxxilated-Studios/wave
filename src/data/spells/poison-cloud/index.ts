import { Spell, Target, SpellType, SpellEffectType } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS, TURNS_FOR_POISON, POISON_DAMAGE } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import PoisonCloudSprite from "./PoisonCloud.png";
import PoisonCloudImage from "./PoisonCloud-image.png";

const PoisonCloud: Spell = {
    name: "Poison Cloud",
    type: "spell",
    target: Target.Enemy,
    kind: SpellType.Combat,
    range: SIGHT_RADIUS,
    manaCost: 61,
    unlockLevel: 20,
    animationFrames: 5,
    image: PoisonCloudImage,
    sprite: PoisonCloudSprite,
    description: "Eeeew. Who did that?",
    effects: [
        { effect: SpellEffectType.Damage, dice: "2d6 + 3" },
        {
            effect: SpellEffectType.ChangeAI,
            to: "poisoned",
            turns: AI_CHANGE_TURNS * TURNS_FOR_POISON * 2,
            description: "poison",
            extraEffect: { effect: SpellEffectType.DamageOverTime, dice: POISON_DAMAGE, turns: TURNS_FOR_POISON * 2 },
        },
    ],
};

export default PoisonCloud;
