import { Spell } from "../../../types";

// Credit: https://untiedgames.itch.io/five-free-pixel-explosions
import MendSprite from "./Mend.png";
// Crefit: https://adwitr.itch.io/pixel-health-bar-asset-pack-2
import MendImage from "./Mend-image.png";

const Mend: Spell = {
    name: "Mend",
    kind: "spell",
    target: "self",
    type: "assist",
    range: 0,
    manaCost: 5,
    unlockLevel: 1,
    animationFrames: 62,
    image: MendImage,
    sprite: MendSprite,
    description: "Mend the wounds you got fighting those big bad enemies",
    effects: [{ effect: "heal", amount: "1d6" }],
};

export default Mend;
