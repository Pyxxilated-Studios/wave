// Check if the level the player is at provides them with more ability points.
export const isAbilityAllocationLevel = (level: number): boolean => level % 5 === 0;
