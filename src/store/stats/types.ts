import { ResetAction } from "../system/types";
import { Abilities, Character, ItemType, Armour, Weapon } from "../../types";

export interface StatsState {
    abilities: Abilities & {
        points: number;
    };
    character: Character;
    health: number;
    abilityModifierHp: number;
    maxHealth: number;
    mana: number;
    abilityModifierMana: number;
    maxMana: number;
    defence: number;
    level: number;
    exp: number;
    expToLevel: number;
    gold: number;
    equippedItems: {
        weapon?: Weapon;
        ring?: Armour;
        helmet?: Armour;
        body?: Armour;
        legs?: Armour;
        boots?: Armour;
        gloves?: Armour;
    };
    levelUp: { level: number; hp: number; mana: number };
}

export const GAIN_EXPERIENCE = "GAIN_EXPERIENCE";
interface GainExperienceAction {
    type: typeof GAIN_EXPERIENCE;
    experience: number;
}

export const SET_ABILITY_SCORES = "SET_ABILITY_SCORES";
interface SetAbilityScoresAction {
    type: typeof SET_ABILITY_SCORES;
    abilities: Abilities;
    points: number;
}

export const EQUIP_ITEM = "EQUIP_ITEM";
export interface EquipItemAction {
    type: typeof EQUIP_ITEM;
    item: ItemType;
}

export const UNEQUIP_ITEM = "UNEQUIP_ITEM";
export interface UnequipItemAction {
    type: typeof UNEQUIP_ITEM;
    item: ItemType;
}

export const GET_GOLD = "GET_GOLD";
interface GetGoldAction {
    type: typeof GET_GOLD;
    amount: number;
}

export const LOSE_GOLD = "LOSE_GOLD";
interface LoseGoldAction {
    type: typeof LOSE_GOLD;
    amount: number;
}

export const HEAL = "HEAL";
interface HealAction {
    type: typeof HEAL;
    kind: string;
    amount: number;
}

export const RESTORE = "RESTORE";
interface RestoreAction {
    type: typeof RESTORE;
    kind: string;
    amount: number;
}

export type StatsActionType =
    | GainExperienceAction
    | SetAbilityScoresAction
    | EquipItemAction
    | UnequipItemAction
    | GetGoldAction
    | LoseGoldAction
    | HealAction
    | RestoreAction
    | ResetAction;
