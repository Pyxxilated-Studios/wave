import { Spell } from "../../../types";
import { SIGHT_RADIUS } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import FireballSprite from "./Fireball.png";
import FireballImage from "./Fireball-image.png";

const Fireball: Spell = {
    name: "Fireball",
    kind: "spell",
    target: "enemy",
    type: "combat",
    range: SIGHT_RADIUS,
    manaCost: 33,
    unlockLevel: 11,
    animationFrames: 5,
    image: FireballImage,
    sprite: FireballSprite,
    description: "Throw a ball of fire at the enemy (or a wall, your choice)",
    effects: [{ effect: "damage", dice: "2d4 + 4" }],
};

export default Fireball;
