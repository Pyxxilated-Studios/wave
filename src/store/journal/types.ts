import { ReactNode } from "react";

import { Ability } from "../../types";
import { ResetAction, LoadAction } from "../system/types";
import { HealAction, RestoreAction, DamageToPlayerAction, GetGoldAction, GainExperienceAction } from "../stats/types";
import { DamageToMonsterAction, MonsterDiedAction, MonsterHealAction, ChangeAiAction } from "../monsters/types";
import { UseProjectileAction, MonsterUseProjectileAction, EffectPlayerAction } from "../player/types";
import { GetItemAction } from "../inventory/types";

export interface JournalState {
    entries: { key: string; entry: ReactNode }[];
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

export const CRITICAL_HIT = "CRITICAL_HIT";
export interface CriticalHitAction {
    type: typeof CRITICAL_HIT;
    dice: string;
    roll: number;
    ability: string;
}

export const LEVEL_UP = "LEVEL_UP";
export interface LevelUpAction {
    type: typeof LEVEL_UP;
    level: number;
    health: number;
    mana: number;
}

export type JournalActionType =
    | AbilityCheckAction
    | MonsterAbilityCheckAction
    | DamageToMonsterAction
    | MonsterDiedAction
    | CriticalHitAction
    | LevelUpAction
    | HealAction
    | RestoreAction
    | DamageToPlayerAction
    | MonsterHealAction
    | UseProjectileAction
    | MonsterUseProjectileAction
    | EffectPlayerAction
    | ChangeAiAction
    | GetItemAction
    | GetGoldAction
    | GainExperienceAction
    | LoadAction
    | ResetAction;
