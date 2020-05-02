import { PlayerTypes, PLAYER_ATTACK, PLAYER_DIED, MOVE_PLAYER } from "./types";

import { Direction, Point } from "../../types";

export const movePlayer = (
  position: Point,
  direction: Direction
): PlayerTypes => {
  return {
    type: MOVE_PLAYER,
    position: position,
    direction: direction,
  };
};

export const playerAttack = (): PlayerTypes => {
  return {
    type: PLAYER_ATTACK,
  };
};

export const playerDie = (): PlayerTypes => {
  return {
    type: PLAYER_DIED,
  };
};
