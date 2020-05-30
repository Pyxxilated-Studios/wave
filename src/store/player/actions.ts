import {
    PlayerActionType,
    PLAYER_ATTACK,
    PLAYER_DIED,
    MOVE_PLAYER,
    TAKE_TURN,
    USE_PROJECTILE,
    MONSTER_USE_PROJECTILE,
    MONSTER_ATTACK,
    EFFECT_PLAYER,
    SET_ACTIVE_SPELL,
} from "./types";

import { Direction, Point, Projectile, Spell } from "../../types";

export const movePlayer = (position: Point, direction: Direction): PlayerActionType => {
    return {
        type: MOVE_PLAYER,
        position: position,
        direction: direction,
    };
};

export const attackMonster = (): PlayerActionType => {
    return {
        type: PLAYER_ATTACK,
    };
};

export const playerDie = (reason: { entity?: string; from?: string }): PlayerActionType => {
    return {
        type: PLAYER_DIED,
        reason,
    };
};

export const playerTakeTurn = (): PlayerActionType => {
    return {
        type: TAKE_TURN,
    };
};

export const useProjectile = (target: Point, projectile: Projectile): PlayerActionType => {
    return { type: USE_PROJECTILE, target, projectile };
};

export const effectPlayer = (effect: string, turns: number, damage: string, entity: string): PlayerActionType => {
    return { type: EFFECT_PLAYER, effect, turns, damage, entity };
};

export const monsterAttack = (): PlayerActionType => {
    return { type: MONSTER_ATTACK };
};

export const monsterUseProjectile = (
    location: Point,
    targetLocation: Point,
    direction: Direction,
    projectile: Projectile,
    entity: string,
): PlayerActionType => {
    return { type: MONSTER_USE_PROJECTILE, location, targetLocation, direction, projectile, entity };
};

export const setActiveSpell = (spell?: Spell): PlayerActionType => {
    return { type: SET_ACTIVE_SPELL, spell };
};
