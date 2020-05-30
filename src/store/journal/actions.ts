import { Ability } from "../../types";
import { JournalActionType, ABILITY_CHECK, MONSTER_ABILITY_CHECK, CRITICAL_HIT, LEVEL_UP } from "./types";

export const abilityCheck = (
    roll: string,
    check: number,
    ability: Ability,
    against: number,
    entity: string,
    againstAbility: string,
): JournalActionType => {
    return { type: ABILITY_CHECK, roll, check, ability, against, entity, againstAbility };
};

export const monsterAbilityCheck = (
    attackValue: number,
    check: number,
    against: string,
    entity: string,
    defender: string,
): JournalActionType => {
    return { type: MONSTER_ABILITY_CHECK, attackValue, check, against, entity, defender };
};

export const rolledCritical = (dice: string, roll: number, ability: string): JournalActionType => {
    return { type: CRITICAL_HIT, dice, roll, ability };
};

export const levelUp = (level: number, health: number, mana: number): JournalActionType => {
    return { type: LEVEL_UP, level, health, mana };
};
