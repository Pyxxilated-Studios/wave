import { StatsActionType, GAIN_EXPERIENCE, SET_ABILITY_SCORES, EQUIP_ITEM, GET_GOLD } from "./types";
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

export const getGold = (amount: number): StatsActionType => {
    return {
        type: GET_GOLD,
        amount,
    };
};
