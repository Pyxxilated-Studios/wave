const calculateWisdomPotionBonus = (baseAmount: number, wisdomBonus: number): number =>
    baseAmount + (wisdomBonus > 0 ? 2 ** wisdomBonus : 0);

export default calculateWisdomPotionBonus;
