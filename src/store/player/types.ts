import { Direction, Point, Projectile, Spell, Effect } from "../../types";
import { ResetAction } from "../system/types";
import { MonsterDiedAction } from "../monsters/types";

export interface PlayerState {
    direction: Direction;
    position: Point;
    playerMoved: boolean;
    playerAttacked: boolean;
    projectileUsed?: Projectile;
    playerDied: boolean;
    targetLocation: Point;
    spell?: Spell;
    turnsOutOfCombat: number;
    monsterAttacked: boolean;
    monsterDied: boolean;
    monsterLocation: Point;
    monsterTargetLocation: Point;
    monsterProjectile?: Projectile;
    monsterProjectileDirection: Direction;
    effects: Effect[];
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

export const TAKE_TURN = "TAKE_TURN";
export interface PlayerTurnAction {
    type: typeof TAKE_TURN;
}

export const PLAYER_ATTACK = "PLAYER_ATTACK";
interface PlayerAttackAction {
    type: typeof PLAYER_ATTACK;
}

export const USE_PROJECTILE = "USE_PROJECTILE";
export interface UseProjectileAction {
    type: typeof USE_PROJECTILE;
    target: Point;
    projectile: Projectile;
}

export const EFFECT_PLAYER = "EFFECT_PLAYER";
interface EffectPlayerAction {
    type: typeof EFFECT_PLAYER;
    effect: string;
    turns: number;
    damage: string;
    entity: string;
}

export const MONSTER_ATTACK = "MONSTER_ATTACK";
interface MonsterAttackAction {
    type: typeof MONSTER_ATTACK;
}

export const MONSTER_USE_PROJECTILE = "MONSTER_USE_PROJECTILE";
interface MonsterUseProjectileAction {
    type: typeof MONSTER_USE_PROJECTILE;
    location: Point;
    targetLocation: Point;
    direction: Direction;
    projectile: Projectile;
    entity: string;
}

export type PlayerActionType =
    | MovePlayerAction
    | PlayerDieAction
    | PlayerAttackAction
    | PlayerTurnAction
    | UseProjectileAction
    | MonsterDiedAction
    | EffectPlayerAction
    | MonsterAttackAction
    | MonsterUseProjectileAction
    | ResetAction;
