import { Abilities, PauseReason, Character, Ability, ChestContents } from "../../types";
import { ResetAction, SetShowJournalAction, SetShowStatsJournalAction, LoadAction } from "../system/types";
import { SetChestDataAction } from "../world/types";
import { PlayerDieAction } from "../player/types";

export interface DialogState {
    paused: boolean;
    reason: PauseReason;
    abilities: Abilities & { points: number };
    abilitiesMinimum: Abilities;
    character: Character;
    chestOpen?: ChestContents;
    diedFrom: { entity?: string; from?: string };
    journalSideMenuOpen: boolean;
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
export interface CreateCharacterAction {
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

export const CHANGE_TUTORIAL_PAGE = "CHANGE_TUTORIAL_PAGE";
interface ChangeTutorialPageAction {
    type: typeof CHANGE_TUTORIAL_PAGE;
    page?: string;
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
    | PlayerDieAction
    | SetShowJournalAction
    | SetShowStatsJournalAction
    | ChangeTutorialPageAction
    | LoadAction
    | ResetAction;
