import { ResetAction, LoadAction } from "../system/types";
import { Abilities, Character, ItemType, Armour, Weapon } from "../../types";
import { UseProjectileAction } from "../player/types";
import { CreateCharacterAction } from "../dialog/types";

export interface StatsState {
    abilities: Abilities & {
        points: number;
    };
    character: Character;
    health: number;
    abilityModifierHealth: number;
    maxHealth: number;
    mana: number;
    abilityModifierMana: number;
    maxMana: number;
    defence: number;
    level: number;
    experience: number;
    experienceToLevel: number;
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
    levelUp: { level: number; health: number; mana: number };
}

export const GAIN_EXPERIENCE = "GAIN_EXPERIENCE";
export interface GainExperienceAction {
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
export interface GetGoldAction {
    type: typeof GET_GOLD;
    amount: number;
}

export const LOSE_GOLD = "LOSE_GOLD";
interface LoseGoldAction {
    type: typeof LOSE_GOLD;
    amount: number;
}

export const HEAL = "HEAL";
export interface HealAction {
    type: typeof HEAL;
    kind: string;
    amount: number;
}

export const RESTORE = "RESTORE";
export interface RestoreAction {
    type: typeof RESTORE;
    kind: string;
    amount: number;
}

export const DAMAGE_TO_PLAYER = "DAMAGE_TO_PLAYER";
export interface DamageToPlayerAction {
    type: typeof DAMAGE_TO_PLAYER;
    damage: number;
    from: { entity?: string; from?: string };
}

export type StatsActionType =
    | GainExperienceAction
    | SetAbilityScoresAction
    | EquipItemAction
    | UnequipItemAction
    | GetGoldAction
    | GainExperienceAction
    | LoseGoldAction
    | HealAction
    | RestoreAction
    | DamageToPlayerAction
    | UseProjectileAction
    | CreateCharacterAction
    | LoadAction
    | ResetAction;
