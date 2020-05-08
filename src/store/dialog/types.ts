import { Abilities, PauseReason, Character, Ability, ChestContents } from "../../types";
import { ResetAction } from "../system/types";
import { SetChestDataAction } from "../world/types";

export interface DialogState {
    paused: boolean;
    reason: PauseReason;
    abilities: Abilities & { points: number };
    abilitiesMinimum: Abilities;
    character: Character;
    chestOpen?: ChestContents;
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

export const SET_LEVEL_UP_ABILITIES = "SET_LEVEL_UP_ABILITIES";
interface SetLevelUpAbilitiesAction {
    type: typeof SET_LEVEL_UP_ABILITIES;
    abilities: Abilities;
}

export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";
interface ToggleSettingsAction {
    type: typeof TOGGLE_SETTINGS;
}

export const CLOSE_SETTINGS = "CLOSE_SETTINGS";
interface CloseSettingsAction {
    type: typeof CLOSE_SETTINGS;
}

export type DialogActionType =
    | PauseAction
    | CreateCharacterAction
    | SetClassAction
    | SetRaceAction
    | IncrementAbilityAction
    | DecrementAbilityAction
    | SetChestDataAction
    | SetLevelUpAbilitiesAction
    | ToggleSettingsAction
    | CloseSettingsAction
    | ResetAction;
