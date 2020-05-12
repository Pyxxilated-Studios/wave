export const calculateDefenceBonus = (dexterityModifier: number): number =>
    dexterityModifier >= 0 ? dexterityModifier + 1 : 0;
