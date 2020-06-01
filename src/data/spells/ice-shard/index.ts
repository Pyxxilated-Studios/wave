import { Spell, Target, SpellType, SpellEffectType } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import IceShardSprite from "./IceShard.png";
import IceShardImage from "./IceShard-image.png";

const IceShard: Spell = {
    name: "Ice Shard",
    type: "spell",
    target: Target.Enemy,
    kind: SpellType.Combat,
    range: SIGHT_RADIUS,
    manaCost: 15,
    unlockLevel: 3,
    animationFrames: 5,
    image: IceShardImage,
    sprite: IceShardSprite,
    description: "Just chill out while I try to figure out what to do!",
    effects: [
        { effect: SpellEffectType.ChangeAI, to: "frozen", turns: AI_CHANGE_TURNS, description: "freeze" },
        { effect: SpellEffectType.Damage, dice: "1d4 + 2" },
    ],
};

export default IceShard;
