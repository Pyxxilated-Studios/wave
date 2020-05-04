import { Abilities, PauseReason, Character, Ability } from "../../types";
import { ResetAction } from "../system/types";

export interface DialogState {
    paused: boolean;
    reason: PauseReason;
    abilities: Abilities & { points: number };
    abilitiesMinimum: Abilities;
    character: Character;
}

export const PAUSE = "PAUSE";
interface PauseAction {
    type: typeof PAUSE;
    paused: boolean;
    reason: PauseReason;
}

export const SET_CLASS = "SET_CLASS";
interface SetClassAction {
    type: typeof SET_CLASS;
    cls: string;
}

export const SET_RACE = "SET_RACE";
interface SetRaceAction {
    type: typeof SET_RACE;
    race: string;
}

export const CREATE_CHARACTER = "CREATE_CHARACTER";
interface CreateCharacterAction {
    type: typeof CREATE_CHARACTER;
    name: string;
    cls: string;
    race: string;
}

export const INCREMENT_ABILITY = "INCREMENT_ABILITY";
interface IncrementAbilityAction {
    type: typeof INCREMENT_ABILITY;
    ability: Ability;
}

export const DECREMENT_ABILITY = "DECREMENT_ABILITY";
interface DecrementAbilityAction {
    type: typeof DECREMENT_ABILITY;
    ability: Ability;
}

export type DialogActionType =
    | PauseAction
    | ResetAction
    | CreateCharacterAction
    | SetClassAction
    | SetRaceAction
    | IncrementAbilityAction
    | DecrementAbilityAction;
