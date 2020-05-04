import { ResetAction } from '../system/types';

export interface StatsState {
    abilities: {
        constitution: number;
        dexterity: number;
        strength: number;
        wisdom: number;
        intelligence: number;
        charisma: number;
        points: number;
    };
    character: {
        characterName: string;
        characterRace: string;
        characterClass: string;
    };
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
    levelUp: { level: number; hp: number };
}

export const GAIN_EXPERIENCE = 'GAIN_EXPERIENCE';
interface GainExperienceAction {
    type: typeof GAIN_EXPERIENCE;
    experience: number;
}

export type StatsActionType = GainExperienceAction | ResetAction;
