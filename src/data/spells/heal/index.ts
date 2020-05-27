import { Spell } from "../../../types";

// Credit: https://untiedgames.itch.io/five-free-pixel-explosions
import HealSprite from "./Heal.png";
// Crefit: https://adwitr.itch.io/pixel-health-bar-asset-pack-2
import HealImage from "./Heal-image.png";

const Heal: Spell = {
    name: "Heal",
    kind: "spell",
    target: "self",
    type: "assist",
    range: 0,
    manaCost: 30,
    unlockLevel: 15,
    animationFrames: 62,
    image: HealImage,
    sprite: HealSprite,
    description: "Aww, did they hurt you?",
    effects: [
        {
            effect: "heal",
            amount: "2d6",
        },
    ],
};

export default Heal;
