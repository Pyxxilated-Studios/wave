import { RootThunk } from "../../../store";
import { movePlayer, playerTakeTurn } from "../../../store/player/actions";
import { pause } from "../../../store/dialog/actions";
import { exploreTiles } from "../../../store/map/actions";

import { MAP_SIZE } from "../../../constants";
import { Direction, Point, Entity, defaultPause } from "../../../types";

import getNextTile from "../../../utils/get-next-tile";

const move = (direction: Direction): RootThunk => async (
  dispatch,
  getState
) => {
  const { player, world, monsters } = getState();

  const oldPosition = player.position;
  const newPosition = getNewPosition(oldPosition, direction);

  const nextTile = getNextTile(getState().world, newPosition);

  if (
    nextTile < 5 &&
    observeBoundaries(newPosition) &&
    !checkForMonster(newPosition, monsters.entities[world.currentMap])
  ) {
    // explore new tiles
    dispatch(exploreTiles(newPosition));
    // move the player
    dispatch(movePlayer(newPosition, direction));
    // Deal with any interactions the player can perform with the next tile
    dispatch(handleInteractWithTile(nextTile, newPosition));
  } else {
    // the player wants to use the shop
    if (nextTile === 9) {
      // show the shop dialog
      dispatch(pause(true, { ...defaultPause, shop: true }));
    }

    // the player has accessed a shrine
    if (nextTile === 10) {
      // check if they have won the game
      dispatch(pause(true, { ...defaultPause, gameWin: true }));
    }
  }
};

export const getNewPosition = (
  oldPosition: Point,
  direction: Direction
): Point => {
  switch (direction) {
    case Direction.North:
      return { x: oldPosition.x, y: oldPosition.y - 1 };
    case Direction.South:
      return { x: oldPosition.x, y: oldPosition.y + 1 };
    case Direction.East:
      return { x: oldPosition.x + 1, y: oldPosition.y };
    case Direction.West:
      return { x: oldPosition.x - 1, y: oldPosition.y };
    default:
      return oldPosition;
  }
};

const observeBoundaries = (newPos: Point) => {
  return (
    newPos.x >= 0 &&
    newPos.x <= MAP_SIZE.width - 1 &&
    newPos.y >= 0 &&
    newPos.y <= MAP_SIZE.height - 1
  );
};

const handleInteractWithTile = (
  nextTile: number,
  newPos: Point
): RootThunk => async (dispatch) => {
  if (nextTile === 2 || nextTile === 3) {
    // the player wants to use the stairs
    //   dispatch({
    //     type: "MAP_TRANSITION",
    //     payload: null,
    //   });
    //   dispatch(walkStairs(nextTile, newPos));
  } else if (nextTile === 4) {
    // // player wants to open chest
    //   const y = newPos.y / SPRITE_SIZE;
    //   const x = newPos.x / SPRITE_SIZE;
    //   // open the chest
    //   dispatch(exploreChest(x, y));
  } else {
    dispatch(playerTakeTurn());
  }
};

const checkForMonster = (
  position: Point,
  monsterList: Record<string, Entity>
): string | undefined =>
  Object.keys(monsterList)
    .map((monsterId) => ({
      location: monsterList[monsterId].location,
      monsterId,
    }))
    .filter(
      (ent) => ent.location.x === position.x && ent.location.y === position.y
    )
    .pop()?.monsterId;

export default move;
