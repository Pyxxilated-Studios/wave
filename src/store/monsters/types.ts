import { Entity, Point, Monster, Direction } from "../../types";
import { ResetAction } from "../system/types";

export interface MonstersState {
    entities: Record<string, Record<string, Entity>>;
}

export const ADD_MONSTERS = "ADD_MONSTERS";
interface AddMonstersAction {
    type: typeof ADD_MONSTERS;
    currentMap: string;
    monsters: Monster[];
}

export const REVEAL_MONSTER = "REVEAL_MONSTER";
interface RevealMonsterAction {
    type: typeof REVEAL_MONSTER;
    id: string;
    currentMap: string;
}

export const HIDE_MONSTER = "HIDE_MONSTER";
interface HideMonsterAction {
    type: typeof HIDE_MONSTER;
    id: string;
    currentMap: string;
}

export const MONSTER_MOVE = "MONSTER_MOVE";
interface MonsterMoveAction {
    type: typeof MONSTER_MOVE;
    id: string;
    currentMap: string;
    position: Point;
    direction: Direction;
}

export const DAMAGE_TO_MONSTER = "DAMAGE_TO_MONSTER";
export interface DamageToMonsterAction {
    type: typeof DAMAGE_TO_MONSTER;
    amount: number;
    monsterId: string;
    map: string;
    entity: string;
    from: string;
}

export const MONSTER_DIED = "MONSTER_DIED";
export interface MonsterDiedAction {
    type: typeof MONSTER_DIED;
    entity: string;
}

export type MonstersActionType =
    | AddMonstersAction
    | RevealMonsterAction
    | HideMonsterAction
    | MonsterMoveAction
    | DamageToMonsterAction
    | MonsterDiedAction
    | ResetAction;
