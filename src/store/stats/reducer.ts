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
    DAMAGE_TO_PLAYER,
} from "./types";
import { RESET, LOAD } from "../system/types";
import { USE_PROJECTILE } from "../player/types";

import { Spell } from "../../types";

import { calculateMaxHealthPool, calculateMaxManaPool } from "../../utils/calculate-max-pool";
import calculateModifier from "../../utils/calculate-modifier";
import { calculateDefenceBonus } from "../../utils/calculate-defence-bonus";

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
        case SET_ABILITY_SCORES: {
            const newAbilityModifierMana = calculateMaxManaPool(
                state.level,
                calculateModifier(action.abilities.intelligence),
            );
            const manaDifference = newAbilityModifierMana - state.abilityModifierMana;

            state.mana += manaDifference;
            state.maxMana += manaDifference;
            state.abilityModifierMana = newAbilityModifierMana;

            // calculate new health
            const newAbilityModifierHealth = calculateMaxHealthPool(
                state.level,
                calculateModifier(action.abilities.constitution),
            );
            const healthDifference = newAbilityModifierHealth - state.abilityModifierHealth;

            state.health += healthDifference;
            state.maxHealth += healthDifference;
            state.abilityModifierHealth = newAbilityModifierHealth;

            const previousDex = calculateModifier(state.abilities.dexterity);
            const currentDex = calculateModifier(action.abilities.dexterity);

            const prevDefenceBonus = calculateDefenceBonus(previousDex);
            const currDefenceBonus = calculateDefenceBonus(currentDex);

            state.defence = state.defence - prevDefenceBonus + currDefenceBonus;

            return { ...state, abilities: { ...action.abilities, points: action.points } };
        }

        case USE_PROJECTILE:
            if (action.projectile.type !== "spell") return state;
            return { ...state, mana: state.mana - (action.projectile as Spell).manaCost };

        case GET_GOLD:
            return { ...state, gold: state.gold + action.amount };

        case GAIN_EXPERIENCE: {
            const newState = cloneDeep(state);

            const newTotalExp = state.experience + action.experience;
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

                // calculate new health
                const newAbilityModifierHealth = calculateMaxHealthPool(
                    newState.level,
                    calculateModifier(state.abilities.constitution),
                );
                newState.levelUp.health = newAbilityModifierHealth - state.abilityModifierHealth;
                newState.health += newState.levelUp.health;
                newState.maxHealth += newState.levelUp.health;
                newState.abilityModifierHealth = newAbilityModifierHealth;

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
                newState.experience += action.experience;
            }

            return newState;
        }

        case DAMAGE_TO_PLAYER:
            return { ...state, health: state.health - action.damage };

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

            if (item.type !== "armour" && item.type !== "weapon") {
                // This should never happen, but it makes the below prettier
                return state;
            }

            switch (item.type) {
                case "armour":
                    equippedItem = state.equippedItems[item.kind];
                    newState.equippedItems[item.kind] = item;
                    break;
                case "weapon":
                    equippedItem = state.equippedItems[item.type];
                    newState.equippedItems[item.type] = item;
                    break;
                default:
                    break;
            }

            if (equippedItem && equippedItem.effects) {
                newState.defence -= equippedItem.effects["defence bonus"] ?? 0;

                const { "mana bonus": manaBonus } = equippedItem.effects;
                if (manaBonus) {
                    newState.mana = Math.max(newState.mana - manaBonus, 1);
                    newState.maxMana -= manaBonus;
                }

                const { "health bonus": healthBonus } = equippedItem.effects;
                if (healthBonus) {
                    newState.health = Math.max(newState.health - healthBonus, 1);
                    newState.maxHealth -= healthBonus;
                }
            }

            if (item.effects) {
                newState.defence += item.effects["defence bonus"] ?? 0;

                if (item.effects["mana bonus"]) {
                    newState.mana += item.effects["mana bonus"];
                    newState.maxMana += item.effects["mana bonus"];
                }

                if (item.effects["health bonus"]) {
                    newState.health += item.effects["health bonus"];
                    newState.maxHealth += item.effects["health bonus"];
                }
            }

            return newState;
        }

        case UNEQUIP_ITEM: {
            const newState = cloneDeep(state);
            const { item } = action;

            let equippedItem = undefined;

            if (item.type !== "armour" && item.type !== "weapon") {
                // This should never happen, but it makes the below prettier
                return state;
            }

            switch (item.type) {
                case "armour":
                    equippedItem = state.equippedItems[item.kind];
                    break;
                case "weapon":
                    equippedItem = state.equippedItems[item.type];
                    break;
                default:
                    break;
            }

            if (equippedItem && equippedItem.effects) {
                newState.defence -= equippedItem.effects["defence bonus"] ?? 0;

                const { "mana bonus": manaBonus } = equippedItem.effects;
                if (manaBonus) {
                    newState.mana = Math.max(newState.mana - manaBonus, 1);
                    newState.maxMana -= manaBonus;
                }

                const { "health bonus": healthBonus } = equippedItem.effects;
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

                case "armour":
                    delete newState.equippedItems[item.kind];
                    break;

                default:
            }

            return newState;
        }

        case LOAD:
            if (!(action.data || action.payload)) return initialState;

            if (action.payload) action.data = action.payload;

            return { ...initialState, ...action.data?.stats };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default StatsReducer;
