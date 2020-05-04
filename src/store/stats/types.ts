import { ResetAction } from "../system/types";
import { Abilities, Character } from "../../types";

export interface StatsState {
    abilities: Abilities & {
        points: number;
    };
    character: Character;
    hp: number;
    abilityModifierHp: number;
    maxHp: number;
    mana: number;
    abilityModifierMana: number;
    maxMana: number;
    defence: number;
    level: number;
    exp: number;
    expToLevel: number;
    gold: number;
    equippedItems: {};
    levelUp: { level: number; hp: number; mana: number };
}

export const GAIN_EXPERIENCE = "GAIN_EXPERIENCE";
interface GainExperienceAction {
    type: typeof GAIN_EXPERIENCE;
    experience: number;
}

export const SET_ABILITY_SCORES = "SET_ABILITY_SCORES";
interface SetAbilityScoresAction {
    type: typeof SET_ABILITY_SCORES;
    abilities: Abilities;
    points: number;
}

export type StatsActionType = GainExperienceAction | ResetAction | SetAbilityScoresAction;
