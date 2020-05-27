import { Spell } from "../../../types";
import { SIGHT_RADIUS } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import MeteorSprite from "./Meteor.png";
import MeteorImage from "./Meteor-image.png";

const Meteor: Spell = {
    name: "Meteor",
    kind: "spell",
    target: "enemy",
    type: "combat",
    range: SIGHT_RADIUS,
    manaCost: 73,
    unlockLevel: 25,
    animationFrames: 5,
    image: MeteorImage,
    sprite: MeteorSprite,
    description: "Fireballs weren't destroying enough walls? Maybe this will suit your destruction needs.",
    effects: [{ effect: "damage", dice: "2d8 + 4" }],
};

export default Meteor;
