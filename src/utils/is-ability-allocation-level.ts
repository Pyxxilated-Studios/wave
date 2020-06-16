import { LEVELS_BETWEEN_ABILITY_POINT_GAIN } from "../constants";

// Check if the level the player is at provides them with more ability points.
export const isAbilityAllocationLevel = (level: number): boolean => level % LEVELS_BETWEEN_ABILITY_POINT_GAIN === 0;
