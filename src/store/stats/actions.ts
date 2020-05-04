import { StatsActionType, GAIN_EXPERIENCE, SET_ABILITY_SCORES } from "./types";
import { Abilities } from "../../types";

export const gainExpereince = (experience: number): StatsActionType => {
    return {
        type: GAIN_EXPERIENCE,
        experience: experience,
    };
};

export const setAbilityScores = (abilities: Abilities, points: number): StatsActionType => {
    return {
        type: SET_ABILITY_SCORES,
        abilities,
        points,
    };
};
