import { Direction, Point } from '../../types';
import { ResetAction } from '../system/types';

export interface PlayerState {
    direction: Direction;
    position: Point;
    playerMoved: boolean;
    playerAttacked: boolean;
    spellCast: boolean;
    playerDied: boolean;
    targetPosition: Point;
    spell: null;
}

export const MOVE_PLAYER = 'MOVE_PLAYER';
interface MovePlayerAction {
    type: typeof MOVE_PLAYER;
    position: Point;
    direction: Direction;
}

export const PLAYER_DIED = 'PLAYER_DIED';
interface PlayerDieAction {
    type: typeof PLAYER_DIED;
}

export const PLAYER_ATTACK = 'PLAYER_ATTACK';
interface PlayerAttackAction {
    type: typeof PLAYER_ATTACK;
}

export const TAKE_TURN = 'TAKE_TURN';
export interface PlayerTurnAction {
    type: typeof TAKE_TURN;
}

export type PlayerActionType = MovePlayerAction | PlayerDieAction | PlayerAttackAction | PlayerTurnAction | ResetAction;
