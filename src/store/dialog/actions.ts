import {
    PAUSE,
    DialogActionType,
    CREATE_CHARACTER,
    SET_CLASS,
    SET_RACE,
    INCREMENT_ABILITY,
    DECREMENT_ABILITY,
    SET_LEVEL_UP_ABILITIES,
} from "./types";
import { PauseReason, Ability, Abilities } from "../../types";

export const pause = (paused: boolean, reason: PauseReason): DialogActionType => {
    return {
        type: PAUSE,
        paused,
        reason,
    };
};

export const setCharacterClass = (cls: string): DialogActionType => {
    return {
        type: SET_CLASS,
        cls,
    };
};

export const setCharacterRace = (race: string): DialogActionType => {
    return {
        type: SET_RACE,
        race,
    };
};

export const characterCreate = (name: string, cls: string, race: string): DialogActionType => {
    return {
        type: CREATE_CHARACTER,
        name,
        cls,
        race,
    };
};

export const incrementAbility = (ability: Ability): DialogActionType => {
    return {
        type: INCREMENT_ABILITY,
        ability,
    };
};

export const decrementAbility = (ability: Ability): DialogActionType => {
    return {
        type: DECREMENT_ABILITY,
        ability,
    };
};

export const setLevelUpAbilities = (abilities: Abilities): DialogActionType => {
    return { type: SET_LEVEL_UP_ABILITIES, abilities };
};
