import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, monsterMove } from "../../../store/monsters/actions";

import { Direction, Monster, Point } from "../../../types";

import { attackPlayer } from "./attack-player";
import { playerInRange, monsterCanMoveTo, isInFieldOfView } from "./move-monster";

const Directions = [Direction.North, Direction.East, Direction.South, Direction.West];
const getRandomDirection = (): Direction => Directions[Math.random() * Directions.length];

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
export const move = (
    direction: Direction,
    position: Point,
    currentMap: string,
    id: string,
    count: number,
): RootThunk => async (dispatch, getState): Promise<void> => {
    count++;
    // dont allow for infinite loops when monster can't move
    if (count >= 5) return;

    const nextPosition = position;

    switch (direction) {
        case Direction.North:
            nextPosition.y -= 1;

            if (!dispatch(monsterCanMoveTo(nextPosition, id, currentMap))) {
                return dispatch(move(Direction.West, position, currentMap, id, count));
            }

            break;

        case Direction.South:
            nextPosition.y += 1;

            if (!dispatch(monsterCanMoveTo(nextPosition, id, currentMap))) {
                return dispatch(move(Direction.East, position, currentMap, id, count));
            }

            break;

        case Direction.West:
            nextPosition.x -= 1;

            if (!dispatch(monsterCanMoveTo(nextPosition, id, currentMap))) {
                return dispatch(move(Direction.South, position, currentMap, id, count));
            }

            break;

        case Direction.East:
            nextPosition.x += 1;

            if (!dispatch(monsterCanMoveTo(nextPosition, id, currentMap))) {
                // move in a circle, but the opposite direction
                return dispatch(move(Direction.North, position, currentMap, id, count));
            }

            break;

        default:
            break;
    }

    // recalculate if the monster is in sight
    const inSight = isInFieldOfView(getState().map.sightBox, nextPosition);

    // if the monster is now in sight
    if (inSight) {
        dispatch(revealMonster(id, currentMap));
    } else {
        // if the monster is now out of sight
        dispatch(hideMonster(id, currentMap));
    }

    const monster = getState().monsters.entities[currentMap][id] as Monster;
    // move the monster
    dispatch(
        monsterMove(
            id,
            currentMap,
            nextPosition,
            direction === Direction.North || direction === Direction.South ? monster.direction : direction,
        ),
    );
};

export const moveNormally = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { id, location } = monster;

    const monsterVisible = isInFieldOfView(sightBox, location);

    if (monsterVisible) {
        dispatch(revealMonster(id, currentMap));

        const { player } = getState();
        // check if player is in range
        if (playerInRange(player.position, location)) {
            dispatch(attackPlayer(monster));
        } else {
            // no player in range, time to move!
            // get the monsters actual position in pixels
            // get distance from player on both axis
            const difference = { x: location.x - player.position.x, y: location.y - player.position.y };

            const greaterY = Math.abs(difference.y) > Math.abs(difference.x);
            // see if y axis is greater distance from player
            if (greaterY) {
                // if the monster is mostly below the player on the y axis
                if (difference.y > 0) {
                    // move the monster 'up' relatively
                    dispatch(move(Direction.North, location, currentMap, id, 0));
                } else if (difference.y < 0) {
                    // if the monster is mostly above the player on the y axis

                    // move the monster 'down' relatively
                    dispatch(move(Direction.South, location, currentMap, id, 0));
                }
            } else {
                // x axis is greater distance from player

                // if the monster is mostly to the right of the player
                if (difference.x > 0) {
                    // move the monster 'left' relatively
                    dispatch(move(Direction.West, location, currentMap, id, 0));
                } else if (difference.x < 0) {
                    // if the monster is mostly to the left of the player

                    // move the monster 'right' relatively
                    dispatch(move(Direction.East, location, currentMap, id, 0));
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
            dispatch(move(randomDirection, location, currentMap, id, 0));
        }
    }
};
