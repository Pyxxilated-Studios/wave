import { BASE_HEALTH, MIN_HEALTH_BONUS, BASE_MANA, MIN_MANA_BONUS } from "../constants";

export const calculateMaxHealthPool = (level: number, constitutionBonus: number): number =>
    BASE_HEALTH + (level - 1) * (constitutionBonus >= 0 ? constitutionBonus + 2 : MIN_HEALTH_BONUS);

export const calculateMaxManaPool = (level: number, intelligenceBonus: number): number =>
    BASE_MANA + (level - 1) * (intelligenceBonus >= 0 ? (intelligenceBonus + 2) * MIN_MANA_BONUS : MIN_MANA_BONUS);
