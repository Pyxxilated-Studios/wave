import cloneDeep from "lodash.clonedeep";

import { StatsState, StatsActionType, GAIN_EXPERIENCE, SET_ABILITY_SCORES, EQUIP_ITEM, GET_GOLD } from "./types";
import { RESET } from "../system/types";

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
        characterName: "",
        characterRace: "",
        characterClass: "",
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
    levelUp: { level: 0, hp: 0, mana: 0 },
};

const StatsReducer = (state = initialState, action: StatsActionType): StatsState => {
    switch (action.type) {
        case GAIN_EXPERIENCE:
            return state;

        case RESET:
            return { ...initialState };

        case SET_ABILITY_SCORES:
            return { ...state, abilities: { ...action.abilities, points: action.points } };

        case GET_GOLD:
            return { ...state, gold: state.gold + action.amount };

        case EQUIP_ITEM: {
            const newState = cloneDeep(state);
            const { item } = action;
            // see what type of item it is

            let equippedItem = undefined;

            switch (item.type) {
                case "body":
                case "boots":
                case "gloves":
                case "helmet":
                case "legs":
                case "ring":
                case "weapon":
                    equippedItem = state.equippedItems[item.type];
                    break;
                default:
            }

            if (equippedItem && equippedItem.effects) {
                newState.defence -= equippedItem.effects.defenceBonus ?? 0;

                const { manaBonus } = equippedItem.effects;
                if (manaBonus) {
                    newState.mana = Math.max(newState.mana - manaBonus, 1);
                    newState.maxMana -= manaBonus;
                }

                const { healthBonus } = equippedItem.effects;
                if (healthBonus) {
                    newState.hp = Math.max(newState.hp - healthBonus, 1);
                    newState.maxMana -= healthBonus;
                }
            }

            if (item.effects) {
                newState.defence += item.effects.defenceBonus ?? 0;

                if (item.effects.manaBonus) {
                    newState.mana += item.effects.manaBonus;
                    newState.maxMana += item.effects.manaBonus;
                }

                if (item.effects.healthBonus) {
                    newState.hp += item.effects.healthBonus;
                    newState.maxHp += item.effects.healthBonus;
                }
            }
            return newState;
        }

        default:
            return state;
    }
};

export default StatsReducer;
