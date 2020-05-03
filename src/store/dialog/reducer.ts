import { DialogState, DialogActionType, PAUSE } from "./types";
import {
  STARTING_ABILITY_SCORE_VALUE,
  STARTING_ABILITY_POINTS,
} from "../../constants";

const initialState: DialogState = {
  paused: true,
  reason: {
    gameText: false,
    gameOver: false,
    gameStart: true,
    gameInstructions: false,
    gameWin: false,
    chest: false,
    chestOpen: false,
    shop: false,
    settings: false,
    inventory: false,
    journalDialog: false,
    spellbookDialog: false,
    levelUp: false,
    fromLevelUp: false,
    abilityDialog: false,
    playerOpenedAbilityDialog: false,
    characterCustomisation: false,
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
  abilities_minimum: {
    constitution: 0,
    dexterity: 0,
    strength: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
  },
  appearance: {
    hairColour: 0,
    skinColour: 0,
    eyeColour: 0,
    armourColour: 0,
    clothesColour: 0,
  },
  character: {
    characterName: null,
    characterRace: "Human",
    characterClass: "Fighter",
  },
};

const DialogReducer = (
  state = initialState,
  action: DialogActionType
): DialogState => {
  switch (action.type) {
    case PAUSE:
      return { ...state, paused: action.paused, reason: action.reason };

    default:
      return state;
  }
};

export default DialogReducer;
