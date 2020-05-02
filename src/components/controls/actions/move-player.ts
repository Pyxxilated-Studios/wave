import { RootThunk } from "../../../store";
import { movePlayer } from "../../../store/player/actions";

import { SPRITE_SIZE } from "../../../constants";
import { Direction, Point } from "../../../types";

const move = (direction: Direction): RootThunk => async (
  dispatch,
  getState
) => {
  const { player } = getState();

  const oldPosition: Point = player.position;
  const newPosition: Point = getNewPosition(oldPosition, direction);

  dispatch(movePlayer(newPosition, direction));
};

export const getNewPosition = (
  oldPosition: Point,
  direction: Direction
): Point => {
  switch (direction) {
    case Direction.North:
      return { x: oldPosition.x, y: oldPosition.y - SPRITE_SIZE };
    case Direction.South:
      return { x: oldPosition.x, y: oldPosition.y + SPRITE_SIZE };
    case Direction.East:
      return { x: oldPosition.x + SPRITE_SIZE, y: oldPosition.y };
    case Direction.West:
      return { x: oldPosition.x - SPRITE_SIZE, y: oldPosition.y };
    default:
      return oldPosition;
  }
};

export default move;
