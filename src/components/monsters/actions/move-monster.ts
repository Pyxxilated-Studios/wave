import { RootThunk } from "../../../store";
import { Point, Direction, Entity } from "../../../types";

import getNextTile from "../../../utils/get-next-tile";
import { translateFromSpriteCoordinates } from "../../../utils/translate-point-sprite";
import { arrayContainsPoint } from "../../../utils/array-contains";
import { WorldState } from "../../../store/world/types";
import {
  revealMonster,
  hideMonster,
  monsterMove,
} from "../../../store/monsters/actions";

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
const moveMonster = (
  direction: Direction,
  position: Point,
  currentMap: string,
  id: string,
  count: number,
  preference: Direction | null = null
): RootThunk => async (dispatch, getState) => {
  count++;
  // dont allow for infinite loops when monster can't move
  if (count >= 5) return;

  let nextPosition: Point = { x: 0, y: 0 };

  switch (direction) {
    case Direction.North:
      nextPosition = { x: position.x, y: position.y - 1 };
      // see if the monster can move to the next location
      if (observeImpassable(nextPosition, getState().world)) {
        // if we found a monster
        if (
          checkForOtherMonster(
            id,
            nextPosition,
            getState().monsters.entities[currentMap]
          )
        ) {
          // move in a circle, but the opposite direction
          return dispatch(
            moveMonster(
              preference ? preference : Direction.West,
              position,
              currentMap,
              id,
              count
            )
          );
        } else {
          // otherwise just move to the next spot
          position.y -= 1;
        }
        break;
      } else {
        // otherwise move them to another spot
        return dispatch(
          moveMonster(
            preference ? preference : Direction.East,
            position,
            currentMap,
            id,
            count
          )
        );
      }
    case Direction.South:
      nextPosition = { x: position.x, y: position.y + 1 };
      // see if the monster can move to the next location
      if (observeImpassable(nextPosition, getState().world)) {
        // if we found a monster
        if (
          checkForOtherMonster(
            id,
            nextPosition,
            getState().monsters.entities[currentMap]
          )
        ) {
          // move in a circle, but the opposite direction
          return dispatch(
            moveMonster(
              preference ? preference : Direction.East,
              position,
              currentMap,
              id,
              count
            )
          );
        } else {
          // otherwise just move to the next spot
          position.y += 1;
        }
        break;
      } else {
        // otherwise move them to another spot
        return dispatch(
          moveMonster(
            preference ? preference : Direction.West,
            position,
            currentMap,
            id,
            count
          )
        );
      }
    case Direction.West:
      nextPosition = { x: position.x - 1, y: position.y };
      // see if the monster can move to the next location
      if (observeImpassable(nextPosition, getState().world)) {
        // if we found a monster
        if (
          checkForOtherMonster(
            id,
            nextPosition,
            getState().monsters.entities[currentMap]
          )
        ) {
          // move in a circle, but the opposite direction
          return dispatch(
            moveMonster(
              preference ? preference : Direction.South,
              position,
              currentMap,
              id,
              count
            )
          );
        } else {
          // otherwise just move to the next spot
          position.x -= 1;
        }
        break;
      } else {
        // otherwise move them to another spot
        return dispatch(
          moveMonster(
            preference ? preference : Direction.North,
            position,
            currentMap,
            id,
            count
          )
        );
      }
    case Direction.East:
      nextPosition = { x: position.x + 1, y: position.y };
      // see if the monster can move to the next location
      if (observeImpassable(nextPosition, getState().world)) {
        // if we found a monster
        if (
          checkForOtherMonster(
            id,
            nextPosition,
            getState().monsters.entities[currentMap]
          )
        ) {
          // move in a circle, but the opposite direction
          return dispatch(
            moveMonster(
              preference ? preference : Direction.North,
              position,
              currentMap,
              id,
              count
            )
          );
        } else {
          // otherwise just move to the next spot
          position.x += 1;
        }
        break;
      } else {
        // otherwise move them to another spot
        return dispatch(
          moveMonster(
            preference ? preference : Direction.South,
            position,
            currentMap,
            id,
            count
          )
        );
      }
    default:
  }

  // look through each current sight box tile
  const inSight = arrayContainsPoint(getState().map.sightBox, nextPosition);

  if (inSight) {
    // if the monster is now in sight
    dispatch(revealMonster(id, currentMap));
  } else {
    // if the monster is now out of sight
    dispatch(hideMonster(id, currentMap));
  }

  // move the monster
  dispatch(monsterMove(id, currentMap, position));
};

const checkForOtherMonster = (
  id: string,
  position: Point,
  monsterList: Record<string, Entity>
): boolean =>
  Object.keys(monsterList)
    .map((monsterId) => ({
      location: monsterList[monsterId].location,
      monsterId,
    }))
    .filter(
      (ent) =>
        id !== ent.monsterId &&
        ent.location.x === position.x &&
        ent.location.y === position.y
    ).length > 0;

const observeImpassable = (newPos: Point, world: WorldState) => {
  const nextTile = getNextTile(world, newPos);
  return nextTile < 5 ? newPos : false;
};

export default moveMonster;
