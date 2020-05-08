/**
 * Calculate the ability modifier for any ability score
 *
 * @param ability The ability score of the ability we want to calculate the modifier for
 */
const calculateModifier = (ability: number): number => Math.floor((ability - 10) / 2);

export default calculateModifier;
