import { RootThunk } from "../../../store";
import { movePlayer } from "../../../store/player/actions";
import { Point, Direction, PlayerState } from "../../../store/player/types";

import { SPRITE_SIZE } from "../../../constants";

export enum CardinalDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST,",
}

const move = (
  direction: CardinalDirection,
  player: PlayerState
): RootThunk => async (dispatch) => {
  const oldPosition: Point = player.position;
  const newPosition = getNewPosition(oldPosition, direction);

  dispatch(
    movePlayer(
      newPosition ? newPosition : oldPosition,
      directionFromCardinalDirection(direction)
    )
  );
};

const directionFromCardinalDirection = (
  direction: CardinalDirection
): Direction => {
  switch (direction) {
    case CardinalDirection.NORTH:
      return Direction.NORTH;
    case CardinalDirection.SOUTH:
      return Direction.SOUTH;
    case CardinalDirection.EAST:
      return Direction.EAST;
    case CardinalDirection.WEST:
      return Direction.WEST;
    default:
  }

  return Direction.SOUTH;
};

export const getNewPosition = (
  oldPosition: Point,
  direction: CardinalDirection
) => {
  switch (direction) {
    case CardinalDirection.NORTH:
      return { x: oldPosition.x, y: oldPosition.y - SPRITE_SIZE };
    case CardinalDirection.SOUTH:
      return { x: oldPosition.x, y: oldPosition.y + SPRITE_SIZE };
    case CardinalDirection.EAST:
      return { x: oldPosition.x + SPRITE_SIZE, y: oldPosition.y };
    case CardinalDirection.WEST:
      return { x: oldPosition.x - SPRITE_SIZE, y: oldPosition.y };
    default:
  }
};

export default move;
