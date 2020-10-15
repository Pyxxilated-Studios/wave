/**
 * Generate a random number between two values
 *
 * @param min The minimum possible value
 * @param max The maximum possible value
 */
export const randBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
