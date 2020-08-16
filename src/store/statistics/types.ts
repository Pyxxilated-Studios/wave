import { DamageToMonsterAction, MonsterDiedAction } from "../monsters/types";
import { MovePlayerAction, UseProjectileAction } from "../player/types";
import { GainExperienceAction, DamageToPlayerAction } from "../stats/types";

export interface StatisticsState {
    steps: number;
    manaUsed: number;
    spellsCast: number;
    experienceGained: number;
    damageDealt: number;
    monstersKilled: number;
    damageTaken: number;
}

export type StatisticsActionType =
    | DamageToMonsterAction
    | MonsterDiedAction
    | UseProjectileAction
    | MovePlayerAction
    | GainExperienceAction
    | DamageToPlayerAction;
