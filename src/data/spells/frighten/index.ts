import { Spell } from "../../../types";
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from "../../../constants";

// Credit: https://kvsr.itch.io/pixelarteffectfx017
import FrightenSprite from "./Frighten.png";
import FrightenImage from "./Frighten-image.png";

const Frighten: Spell = {
    name: "Frighten",
    type: "spell",
    target: "enemy",
    kind: "combat",
    range: SIGHT_RADIUS,
    manaCost: 40,
    unlockLevel: 13,
    animationFrames: 5,
    image: FrightenImage,
    sprite: FrightenSprite,
    description: "Everybody was kung-fu fighting! Those kicks were fast as lightning! In fact it was a little bit...",
    effects: [
        { effect: "changeAI", to: "frightened", turns: AI_CHANGE_TURNS, description: "frighten" },
        { effect: "damage", dice: "2d6" },
    ],
};

export default Frighten;
