import { Spell, Target, SpellType, SpellEffectType } from "../../../types";

// Credit: https://untiedgames.itch.io/five-free-pixel-explosions
import MendSprite from "./Mend.png";
// Crefit: https://adwitr.itch.io/pixel-health-bar-asset-pack-2
import MendImage from "./Mend-image.png";

const Mend: Spell = {
    name: "Mend",
    type: "spell",
    target: Target.Self,
    kind: SpellType.Assist,
    range: 0,
    manaCost: 5,
    unlockLevel: 1,
    animationFrames: 62,
    image: MendImage,
    sprite: MendSprite,
    description: "Mend the wounds you got fighting those big bad enemies",
    effects: [{ effect: SpellEffectType.Heal, amount: "1d6" }],
};

export default Mend;
