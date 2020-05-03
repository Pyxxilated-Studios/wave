import GolemSprite from "./stone-golem.png";
import { Monster } from "../../../types";

const StoneGolem: Monster = {
  hp: 30,
  maxHp: 30,
  attackValue: 8,
  defence: 5,
  dice: "1d8 + 2",
  exp: 60,
  type: "stone-golem",
  sprite: GolemSprite,
};

export default StoneGolem;
