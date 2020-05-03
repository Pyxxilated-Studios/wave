import { RootThunk } from "../../../store";
import { movePlayer, playerTakeTurn } from "../../../store/player/actions";

import { exploreTiles } from "../../../store/map/actions";
import { MAP_SIZE } from "../../../constants";
import { Direction, Point } from "../../../types";

import getNextTile from "../../../utils/get-next-tile";

const move = (direction: Direction): RootThunk => async (
  dispatch,
  getState
) => {
  const { player } = getState();

  const oldPosition = player.position;
  const newPosition = getNewPosition(oldPosition, direction);

  const nextTile = getNextTile(getState().world, newPosition);

  if (
    observeBoundaries(newPosition) &&
    nextTile < 5 // && !dispatch(checkForMonster(newPosition, direction))
  ) {
    // explore new tiles
    dispatch(exploreTiles(newPosition));
    // move the player
    dispatch(movePlayer(newPosition, direction));
    // if we do anything but use stairs, count a turn
    if (handleInteractWithTile(nextTile, newPosition)) {
      dispatch(playerTakeTurn());
    }
  } else {
    // the player wants to use the shop
    // if (nextTile === 9) {
    //   // show the shop dialog
    //   dispatch({
    //     type: "PAUSE",
    //     payload: {
    //       pause: true,
    //       shop: true,
    //     },
    //   });
    // }
    // the player has accessed a shrine
    // if (nextTile === 10) {
    //   // check if they have won the game
    //   dispatch({
    //     type: "PAUSE",
    //     payload: {
    //       pause: true,
    //       gameWin: true,
    //     },
    //   });
    // }
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
  // the player wants to use the stairs
  // if (nextTile === 2 || nextTile === 3) {
  //   dispatch({
  //     type: "MAP_TRANSITION",
  //     payload: null,
  //   });
  //   dispatch(walkStairs(nextTile, newPos));
  //   return false;
  // }

  // // player wants to open chest
  // if (nextTile === 4) {
  //   const y = newPos.y / SPRITE_SIZE;
  //   const x = newPos.x / SPRITE_SIZE;
  //   // open the chest
  //   dispatch(exploreChest(x, y));
  // }

  return true;
};

// const checkForMonster = (newPosition: Point) {
//   return (_, getState) => {
//       let isMonster = false;
//       const { currentMap } = getState().world;
//       const monsters = getState().monsters.components;
//       // check for monsters
//       Object.keys(monsters[currentMap]).forEach(monsterId => {
//           const currMonster = monsters[currentMap][monsterId];
//           // if the new position contains a monster
//           if (
//               JSON.stringify(currMonster.position) === JSON.stringify(newPos)
//           ) {
//               isMonster = currMonster.id;
//           }
//       });

//       return isMonster;
//   };
// }

export default move;
