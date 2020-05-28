import { Direction, Point, Projectile, Spell } from "../../types";
import { ResetAction } from "../system/types";
import { MonsterDiedAction } from "../monsters/types";

export interface PlayerState {
    direction: Direction;
    position: Point;
    playerMoved: boolean;
    playerAttacked: boolean;
    spellCast: boolean;
    playerDied: boolean;
    targetPosition: Point;
    spell?: Spell;
    turnsOutOfCombat: number;
    monsterAttacked: boolean;
    monsterDied: boolean;
}

export const MOVE_PLAYER = "MOVE_PLAYER";
interface MovePlayerAction {
    type: typeof MOVE_PLAYER;
    position: Point;
    direction: Direction;
}

export const PLAYER_DIED = "PLAYER_DIED";
export interface PlayerDieAction {
    type: typeof PLAYER_DIED;
    reason: { from?: string; entity?: string };
}

export const PLAYER_ATTACK = "PLAYER_ATTACK";
interface PlayerAttackAction {
    type: typeof PLAYER_ATTACK;
}

export const TAKE_TURN = "TAKE_TURN";
export interface PlayerTurnAction {
    type: typeof TAKE_TURN;
}

export const USE_PROJECTILE = "USE_PROJECTILE";
export interface UseProjectileAction {
    type: typeof USE_PROJECTILE;
    target: Point;
    projectile: Projectile;
}

export type PlayerActionType =
    | MovePlayerAction
    | PlayerDieAction
    | PlayerAttackAction
    | PlayerTurnAction
    | UseProjectileAction
    | MonsterDiedAction
    | ResetAction;
