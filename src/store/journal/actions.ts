import { Ability } from "../../types";
import { ABILITY_CHECK, JournalActionType } from "./types";

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
