export enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

export interface Point {
  x: number;
  y: number;
}

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

export const MOVE_PLAYER = "MOVE_PLAYER";
interface MovePlayerAction {
  type: typeof MOVE_PLAYER;
  position: Point;
  direction: Direction;
}

export const PLAYER_DIED = "PLAYER_DIED";
interface PlayerDieAction {
  type: typeof PLAYER_DIED;
}

export const PLAYER_ATTACK = "PLAYER_ATTACK";
interface PlayerAttackAction {
  type: typeof PLAYER_ATTACK;
}

export type PlayerTypes =
  | MovePlayerAction
  | PlayerDieAction
  | PlayerAttackAction;
