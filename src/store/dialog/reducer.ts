import {
    DialogState,
    DialogActionType,
    PAUSE,
    CREATE_CHARACTER,
    SET_CLASS,
    SET_RACE,
    INCREMENT_ABILITY,
    DECREMENT_ABILITY,
    SET_LEVEL_UP_ABILITIES,
    TOGGLE_SETTINGS,
    CLOSE_SETTINGS,
    CHANGE_TUTORIAL_PAGE,
} from "./types";
import { STARTING_ABILITY_SCORE_VALUE, STARTING_ABILITY_POINTS, MAX_ABILITY_SCORE } from "../../constants";
import { RESET, SET_SHOW_JOURNAL, LOAD, SET_SHOW_STATS_JOURNAL } from "../system/types";
import { SET_CHEST_DATA } from "../world/types";
import { PLAYER_DIED } from "../player/types";

const initialState: DialogState = {
    paused: true,
    reason: {
        gameText: { title: "", body: "" },
        gameOver: false,
        gameStart: true,
        gameRunning: false,
        gameInstructions: false,
        gameWin: false,
        chest: false,
        shop: false,
        settings: false,
        inventory: false,
        journalDialog: false,
        spellbookDialog: false,
        levelUp: false,
        fromLevelUp: false,
        abilityDialog: false,
        playerOpenedAbilityDialog: false,
        characterCreation: false,
        tutorialDialog: false,
        tutorialPage: "movement",
    },
    abilities: {
        constitution: STARTING_ABILITY_SCORE_VALUE,
        dexterity: STARTING_ABILITY_SCORE_VALUE,
        strength: STARTING_ABILITY_SCORE_VALUE,
        wisdom: STARTING_ABILITY_SCORE_VALUE,
        intelligence: STARTING_ABILITY_SCORE_VALUE,
        charisma: STARTING_ABILITY_SCORE_VALUE,
        points: STARTING_ABILITY_POINTS,
    },
    abilitiesMinimum: {
        constitution: 0,
        dexterity: 0,
        strength: 0,
        wisdom: 0,
        intelligence: 0,
        charisma: 0,
    },
    character: {
        name: "",
        race: "Human",
        cclass: "Fighter",
    },
    diedFrom: {},
    journalSideMenuOpen: false,
};

const DialogReducer = (state = initialState, action: DialogActionType): DialogState => {
    switch (action.type) {
        case PAUSE:
            if (action.reason.journalDialog !== undefined) {
                state.journalSideMenuOpen = action.reason.journalDialog;
            }

            action.reason.gameRunning = action.reason.gameRunning || state.reason.gameRunning;

            return { ...state, paused: action.paused, reason: action.reason };

        case SET_SHOW_JOURNAL:
        case SET_SHOW_STATS_JOURNAL:
            return {
                ...state,
                paused: state.reason.journalDialog || state.paused,
                journalSideMenuOpen: (state.reason.journalDialog || false) && action.set,
            };

        case CREATE_CHARACTER:
            return {
                ...state,
                character: { name: action.name, cclass: action.cls, race: action.race },
            };

        case SET_RACE:
            return {
                ...state,
                character: {
                    ...state.character,
                    race: action.race,
                },
            };

        case SET_CLASS:
            return {
                ...state,
                character: {
                    ...state.character,
                    cclass: action.cls,
                },
            };

        case INCREMENT_ABILITY: {
            const ability = state.abilities[action.ability];
            if (ability >= MAX_ABILITY_SCORE || state.abilities.points <= 0) {
                return state;
            }
            return {
                ...state,
                abilities: { ...state.abilities, [action.ability]: ability + 1, points: state.abilities.points - 1 },
            };
        }

        case DECREMENT_ABILITY: {
            const ability = state.abilities[action.ability];
            if (ability <= 0) {
                return state;
            }
            return {
                ...state,
                abilities: { ...state.abilities, [action.ability]: ability - 1, points: state.abilities.points + 1 },
            };
        }

        case SET_LEVEL_UP_ABILITIES:
            return {
                ...state,
                abilities: { ...state.abilities, ...action.abilities },
                abilitiesMinimum: action.abilities,
            };

        case SET_CHEST_DATA:
            if (action.data) {
                return {
                    ...state,
                    chestOpen: { ...action.data },
                };
            }

            return { ...state, reason: {} };

        case PLAYER_DIED:
            return { ...state, diedFrom: action.reason };

        case CHANGE_TUTORIAL_PAGE:
            return { ...state, reason: { ...state.reason, tutorialPage: action.page } };

        case TOGGLE_SETTINGS:
            return { ...state, paused: !state.paused, reason: { ...state.reason, settings: !state.reason.settings } };

        case CLOSE_SETTINGS:
            return { ...state, paused: false, reason: { ...state.reason, settings: false } };

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.dialog };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default DialogReducer;
