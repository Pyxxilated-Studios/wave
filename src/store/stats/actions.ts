import {
    StatsActionType,
    SET_ABILITY_SCORES,
    EQUIP_ITEM,
    GET_GOLD,
    HEAL,
    RESTORE,
    LOSE_GOLD,
    UNEQUIP_ITEM,
    GAIN_EXPERIENCE,
    DAMAGE_TO_PLAYER,
} from "./types";
import { Abilities, ItemType } from "../../types";

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

export const equipItem = (item: ItemType): StatsActionType => {
    return {
        type: EQUIP_ITEM,
        item,
    };
};

export const unequipItem = (item: ItemType): StatsActionType => {
    return { type: UNEQUIP_ITEM, item };
};

export const getGold = (amount: number): StatsActionType => {
    return {
        type: GET_GOLD,
        amount,
    };
};

export const gainExperience = (experience: number): StatsActionType => {
    return {
        type: GAIN_EXPERIENCE,
        experience,
    };
};

export const loseGold = (amount: number): StatsActionType => {
    return {
        type: LOSE_GOLD,
        amount,
    };
};

export const heal = (kind: string, amount: number): StatsActionType => {
    return {
        type: HEAL,
        kind,
        amount,
    };
};

export const restore = (kind: string, amount: number): StatsActionType => {
    return {
        type: RESTORE,
        kind,
        amount,
    };
};

export const damageToPlayer = (damage: number, from: { from?: string; entity?: string }): StatsActionType => {
    return { type: DAMAGE_TO_PLAYER, damage, from };
};
