import { PlayerActionType, PLAYER_ATTACK, PLAYER_DIED, MOVE_PLAYER, TAKE_TURN, USE_PROJECTILE } from "./types";

import { Direction, Point, Projectile } from "../../types";

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

export const playerDie = (from: string): PlayerActionType => {
    return {
        type: PLAYER_DIED,
        from,
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
