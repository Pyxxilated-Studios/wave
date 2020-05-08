import { BASE_HEALTH, MIN_HEALTH_BONUS, BASE_MANA, MIN_MANA_BONUS } from "../constants";

/**
 * Calculate the maximumum health pool that the player will have based on their level and consittution bonus
 *
 * @param level The level of the player
 * @param constitutionBonus The constitution bonus that the player has
 */
export const calculateMaxHealthPool = (level: number, constitutionBonus: number): number =>
    BASE_HEALTH + (level - 1) * (constitutionBonus >= 0 ? constitutionBonus + 2 : MIN_HEALTH_BONUS);

/**
 * Calculate the maximum mana pool that the player will have based on their current level and intelligence bonus
 *
 * @param level The level of the player
 * @param intelligenceBonus The intelligence bonus of the player
 */
export const calculateMaxManaPool = (level: number, intelligenceBonus: number): number =>
    BASE_MANA + (level - 1) * (intelligenceBonus >= 0 ? (intelligenceBonus + 2) * MIN_MANA_BONUS : MIN_MANA_BONUS);
