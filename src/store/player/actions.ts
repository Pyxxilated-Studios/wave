import { PlayerActionType, PLAYER_ATTACK, PLAYER_DIED, MOVE_PLAYER, TAKE_TURN } from './types';

import { Direction, Point } from '../../types';

export const movePlayer = (position: Point, direction: Direction): PlayerActionType => {
    return {
        type: MOVE_PLAYER,
        position: position,
        direction: direction,
    };
};

export const playerAttack = (): PlayerActionType => {
    return {
        type: PLAYER_ATTACK,
    };
};

export const playerDie = (): PlayerActionType => {
    return {
        type: PLAYER_DIED,
    };
};

export const playerTakeTurn = (): PlayerActionType => {
    return {
        type: TAKE_TURN,
    };
};
