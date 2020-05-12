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

export type JournalActionType = AbilityCheckAction | DamageToMonsterAction | MonsterDiedAction | ResetAction;
