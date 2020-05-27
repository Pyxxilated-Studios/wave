import { ReactNode } from "react";

import { Ability } from "../../types";
import { ResetAction } from "../system/types";
import { DamageToMonsterAction, MonsterDiedAction } from "../monsters/types";

export interface JournalState {
    entries: ReactNode[];
    scroll: boolean;
}

export const ABILITY_CHECK = "ABILITY_CHECK";
interface AbilityCheckAction {
    type: typeof ABILITY_CHECK;
    roll: string;
    check: number;
    ability: Ability;
    against: number;
    entity: string;
    againstAbility: string;
}

export const MONSTER_ABILITY_CHECK = "MONSTER_ABILITY_CHECK";
export interface MonsterAbilityCheckAction {
    type: typeof MONSTER_ABILITY_CHECK;
    attackValue: number;
    check: number;
    against: string;
    entity: string;
    defender: string;
}

export type JournalActionType =
    | AbilityCheckAction
    | MonsterAbilityCheckAction
    | DamageToMonsterAction
    | MonsterDiedAction
    | ResetAction;
