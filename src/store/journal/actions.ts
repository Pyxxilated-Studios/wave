import { Ability } from "../../types";
import { ABILITY_CHECK, JournalActionType, MONSTER_ABILITY_CHECK } from "./types";

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
