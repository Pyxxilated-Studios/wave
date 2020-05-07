import {
    DialogState,
    DialogActionType,
    PAUSE,
    CREATE_CHARACTER,
    SET_CLASS,
    SET_RACE,
    INCREMENT_ABILITY,
    DECREMENT_ABILITY,
} from "./types";
import { STARTING_ABILITY_SCORE_VALUE, STARTING_ABILITY_POINTS, MAX_ABILITY_SCORE } from "../../constants";
import { RESET } from "../system/types";
import { SET_CHEST_DATA } from "../world/types";

const initialState: DialogState = {
    paused: true,
    reason: {
        gameText: { title: "", body: "" },
        gameOver: false,
        gameStart: true,
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
        characterName: "",
        characterRace: "Human",
        characterClass: "Fighter",
    },
};

const DialogReducer = (state = initialState, action: DialogActionType): DialogState => {
    switch (action.type) {
        case PAUSE:
            return { ...state, paused: action.paused, reason: action.reason };

        case RESET:
            return { ...initialState };

        case CREATE_CHARACTER:
            return {
                ...state,
                character: { characterName: action.name, characterClass: action.cls, characterRace: action.race },
            };

        case SET_RACE:
            return {
                ...state,
                character: {
                    ...state.character,
                    characterRace: action.race,
                },
            };

        case SET_CLASS:
            return {
                ...state,
                character: {
                    ...state.character,
                    characterClass: action.cls,
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

        case SET_CHEST_DATA:
            if (action.data) {
                return {
                    ...state,
                    chestOpen: { ...action.data },
                };
            }

            return { ...state, reason: {} };

        default:
            return state;
    }
};

export default DialogReducer;
