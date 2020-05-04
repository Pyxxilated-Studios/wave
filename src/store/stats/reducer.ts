import { StatsState, StatsActionType, GAIN_EXPERIENCE } from './types';
import { RESET } from '../system/types';

const initialState: StatsState = {
    abilities: {
        constitution: 0,
        dexterity: 0,
        strength: 0,
        wisdom: 0,
        intelligence: 0,
        charisma: 0,
        points: 0,
    },
    character: {
        characterName: '',
        characterRace: '',
        characterClass: '',
    },
    hp: 0,
    abilityModifierHp: 0,
    maxHp: 0,
    mana: 0,
    abilityModifierMana: 0,
    maxMana: 0,
    defence: 0,
    level: 1,
    exp: 0,
    expToLevel: 20,
    gold: 0,
    equippedItems: {},
    levelUp: { level: 0, hp: 0 },
};

const StatsReducer = (state = initialState, action: StatsActionType): StatsState => {
    switch (action.type) {
        case GAIN_EXPERIENCE:
            return state;

        case RESET:
            return { ...initialState };

        default:
            return state;
    }
};

export default StatsReducer;
