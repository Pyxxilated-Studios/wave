import cloneDeep from "lodash.clonedeep";

import {
    StatsState,
    StatsActionType,
    GAIN_EXPERIENCE,
    SET_ABILITY_SCORES,
    EQUIP_ITEM,
    GET_GOLD,
    LOSE_GOLD,
    HEAL,
    RESTORE,
    UNEQUIP_ITEM,
    GET_EXPERIENCE,
} from "./types";
import { RESET } from "../system/types";
import { Armour, Weapon } from "../../types";

import { calculateMaxHealthPool, calculateMaxManaPool } from "../../utils/calculate-max-pool";
import calculateModifier from "../../utils/calculate-modifier";

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
        name: "",
        race: "",
        cclass: "",
    },
    health: 0,
    abilityModifierHealth: 0,
    maxHealth: 0,
    mana: 0,
    abilityModifierMana: 0,
    maxMana: 0,
    defence: 0,
    level: 1,
    experience: 0,
    experienceToLevel: 20,
    gold: 0,
    equippedItems: {},
    levelUp: { level: 0, health: 0, mana: 0 },
};

const StatsReducer = (state = initialState, action: StatsActionType): StatsState => {
    switch (action.type) {
        case GAIN_EXPERIENCE:
            return state;

        case RESET:
            return initialState;

        case SET_ABILITY_SCORES:
            return { ...state, abilities: { ...action.abilities, points: action.points } };

        case GET_GOLD:
            return { ...state, gold: state.gold + action.amount };

        case GET_EXPERIENCE: {
            const newState = cloneDeep(state);

            const newTotalExp = state.experience + action.amount;
            const { experienceToLevel: expToLevel } = state;
            // if they are leveling up
            if (newTotalExp >= expToLevel) {
                // increment level
                newState.level += 1;

                // calculate leftover exp if it isn't exactly enough
                if (!(newState.experience === expToLevel)) {
                    const leftoverExp = newTotalExp % expToLevel;
                    newState.experience = leftoverExp;
                }

                // set next exp goal to be 1.5 times as much if player is 5 or less
                if (newState.level < 6) {
                    newState.experienceToLevel = Math.floor(state.experienceToLevel * 1.5);
                } // otherwise set it to be 1.25 times as much
                else if (newState.level < 20) {
                    newState.experienceToLevel = Math.floor(state.experienceToLevel * 1.25);
                }

                // calculate new hp
                const newAbilityModifierHp = calculateMaxHealthPool(
                    newState.level,
                    calculateModifier(state.abilities.constitution),
                );
                newState.levelUp.health = newAbilityModifierHp - state.abilityModifierHealth;
                newState.health += newState.levelUp.health;
                newState.maxHealth += newState.levelUp.health;
                newState.abilityModifierHealth = newAbilityModifierHp;

                // calculate new mana
                const newAbilityModifierMana = calculateMaxManaPool(
                    newState.level,
                    calculateModifier(state.abilities.intelligence),
                );
                newState.levelUp.mana = newAbilityModifierMana - state.abilityModifierMana;
                newState.mana += newState.levelUp.mana;
                newState.maxMana += newState.levelUp.mana;
                newState.abilityModifierMana = newAbilityModifierMana;

                newState.levelUp.level = newState.level;
            } else {
                // they aren't leveling up
                newState.experience += action.amount;
            }

            return newState;
        }

        case LOSE_GOLD:
            return { ...state, gold: state.gold - action.amount };

        case HEAL:
            return { ...state, health: Math.min(state.health + action.amount, state.maxHealth) };

        case RESTORE:
            return { ...state, mana: Math.min(state.mana + action.amount, state.maxMana) };

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
                    equippedItem = state.equippedItems[item.type];
                    newState.equippedItems[item.type] = item as Armour;
                    break;
                case "weapon":
                    equippedItem = state.equippedItems[item.type];
                    newState.equippedItems[item.type] = item as Weapon;
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
                    newState.health = Math.max(newState.health - healthBonus, 1);
                    newState.maxHealth -= healthBonus;
                }
            }

            if (item.effects) {
                newState.defence += item.effects.defenceBonus ?? 0;

                if (item.effects.manaBonus) {
                    newState.mana += item.effects.manaBonus;
                    newState.maxMana += item.effects.manaBonus;
                }

                if (item.effects.healthBonus) {
                    newState.health += item.effects.healthBonus;
                    newState.maxHealth += item.effects.healthBonus;
                }
            }

            return newState;
        }

        case UNEQUIP_ITEM: {
            const newState = cloneDeep(state);
            const { item } = action;

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
                    newState.health = Math.max(newState.health - healthBonus, 1);
                    newState.maxHealth -= healthBonus;
                }
            }

            // check the type
            switch (item.type) {
                case "weapon":
                    delete newState.equippedItems.weapon;
                    break;

                case "body":
                    delete newState.equippedItems.body;
                    break;

                case "helmet":
                    delete newState.equippedItems.helmet;
                    break;

                case "legs":
                    delete newState.equippedItems.legs;
                    break;

                case "boots":
                    delete newState.equippedItems.boots;
                    break;

                case "gloves":
                    delete newState.equippedItems.gloves;
                    break;

                case "ring":
                    delete newState.equippedItems.ring;

                    break;

                default:
            }

            return newState;
        }

        default:
            return state;
    }
};

export default StatsReducer;
