import { RootThunk } from "../../../store";
import { revealMonster, hideMonster } from "../../../store/monsters/actions";
import { Point, Direction } from "../../../types";

import { radiusTiles } from "../../../utils/get-surrounding-tiles";
import { arrayContainsPoint } from "../../../utils/array-contains";
import { distance } from "../../../utils/distance";

import attackPlayer from "./attack-player";
import moveMonster from "./move-monster";

const MONSTER_ATTACK_RADIUS = 1;

const takeMonstersTurn = (): RootThunk => async (dispatch, getState) => {
  const { monsters, map, world } = getState();
  // get the current monsters
  const { entities } = monsters;
  const { sightBox } = map;
  const { currentMap } = world;

  // find each monster
  Object.keys(entities[currentMap]).forEach((monsterId) => {
    // Get monster id and position
    const { id, location, attackValue, dice, type } = entities[currentMap][
      monsterId
    ];

    const monsterVisible = arrayContainsPoint(sightBox, location);

    if (monsterVisible) {
      dispatch(revealMonster(id, currentMap));

      const { player } = getState();
      // check if player is in range
      if (playerInRange(player.position, location)) {
        dispatch(attackPlayer(attackValue, dice, type));
      } else {
        // no player in range, time to move!
        // get the monsters actual position in pixels
        // get distance from player on both axis
        const { dx, dy } = distance(location, player.position);
        const greaterY = Math.abs(dy) > Math.abs(dx);

        // see if y axis is greater distance from player
        if (greaterY) {
          // if the monster is mostly below the player on the y axis
          if (dy > 0) {
            // move the monster 'up' relatively
            dispatch(
              moveMonster(
                Direction.North,
                location,
                currentMap,
                id,
                0,
                dx >= 0 ? Direction.West : Direction.East
              )
            );
          } else if (dy < 0) {
            // if the monster is mostly above the player on the y axis
            // move the monster 'down' relatively
            dispatch(
              moveMonster(
                Direction.South,
                location,
                currentMap,
                id,
                0,
                dx >= 0 ? Direction.West : Direction.East
              )
            );
          }
        } else {
          // x axis is greater distance from player
          // if the monster is mostly to the right of the player
          if (dx > 0) {
            // move the monster 'left' relatively
            dispatch(
              moveMonster(
                Direction.West,
                location,
                currentMap,
                id,
                0,
                dy >= 0 ? Direction.North : Direction.South
              )
            );
          } else if (dx < 0) {
            // if the monster is mostly to the left of the player
            // move the monster 'right' relatively
            dispatch(
              moveMonster(
                Direction.East,
                location,
                currentMap,
                id,
                0,
                dy >= 0 ? Direction.North : Direction.South
              )
            );
          }
        }
      }
    } else {
      // monster is too far away from the player
      dispatch(hideMonster(id, currentMap));

      // give a 25% chance to move the monster when hidden
      if (Math.round(Math.random() * (4 - 1) + 1) !== 4) {
        const randomDirection = getRandomDirection();
        // move the monster in a random direction
        dispatch(moveMonster(randomDirection, location, currentMap, id, 0));
      }
    }
  });
};

const playerInRange = (
  playerPosition: Point,
  monsterPosition: Point
): boolean => {
  const inRange = radiusTiles(MONSTER_ATTACK_RADIUS).some((tile) => {
    const offsetX = tile.x + monsterPosition.x;
    const offsetY = tile.y + monsterPosition.y;

    return offsetX === playerPosition.x && offsetY === playerPosition.y;
  });

  return inRange;
};

const directions = [
  Direction.North,
  Direction.South,
  Direction.East,
  Direction.West,
];
const getRandomDirection = (): Direction => {
  const randomNumber = Math.floor(Math.random() * directions.length);
  return directions[randomNumber];
};

export default takeMonstersTurn;
