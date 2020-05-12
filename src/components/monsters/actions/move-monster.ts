import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, monsterMove } from "../../../store/monsters/actions";
import { Point, Direction, Entity } from "../../../types";

import { arrayContainsPoint } from "../../../utils/array-contains";
import { traversableTile, monsterAtPosition } from "../../../utils/movement";

const checkForOtherMonster = (id: string, position: Point, monsterList: Record<string, Entity>): boolean =>
    monsterAtPosition(position, monsterList)?.some((monsterID) => monsterID !== id) || false;

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
const moveMonster = (
    direction: Direction,
    position: Point,
    currentMap: string,
    id: string,
    count: number,
    preference?: Direction,
): RootThunk => async (dispatch, getState): Promise<void> => {
    count++;
    // dont allow for infinite loops when monster can't move
    if (count >= 5) return;

    let nextPosition: Point = { x: 0, y: 0 };

    const { maps, floorNumber } = getState().world;

    switch (direction) {
        case Direction.North:
            nextPosition = { x: position.x, y: position.y - 1 };
            // see if the monster can move to the next location
            if (traversableTile(nextPosition, maps[floorNumber - 1].tiles)) {
                // if we found a monster
                if (checkForOtherMonster(id, nextPosition, getState().monsters.entities[currentMap])) {
                    // move in a circle, but the opposite direction
                    return dispatch(
                        moveMonster(preference ? preference : Direction.West, position, currentMap, id, count),
                    );
                } else {
                    // otherwise just move to the next spot
                    position.y -= 1;
                }
                break;
            } else {
                // otherwise move them to another spot
                return dispatch(moveMonster(preference ? preference : Direction.East, position, currentMap, id, count));
            }
        case Direction.South:
            nextPosition = { x: position.x, y: position.y + 1 };
            // see if the monster can move to the next location
            if (traversableTile(nextPosition, maps[floorNumber - 1].tiles)) {
                // if we found a monster
                if (checkForOtherMonster(id, nextPosition, getState().monsters.entities[currentMap])) {
                    // move in a circle, but the opposite direction
                    return dispatch(
                        moveMonster(preference ? preference : Direction.East, position, currentMap, id, count),
                    );
                } else {
                    // otherwise just move to the next spot
                    position.y += 1;
                }
                break;
            } else {
                // otherwise move them to another spot
                return dispatch(moveMonster(preference ? preference : Direction.West, position, currentMap, id, count));
            }
        case Direction.West:
            nextPosition = { x: position.x - 1, y: position.y };
            // see if the monster can move to the next location
            if (traversableTile(nextPosition, maps[floorNumber - 1].tiles)) {
                // if we found a monster
                if (checkForOtherMonster(id, nextPosition, getState().monsters.entities[currentMap])) {
                    // move in a circle, but the opposite direction
                    return dispatch(
                        moveMonster(preference ? preference : Direction.South, position, currentMap, id, count),
                    );
                } else {
                    // otherwise just move to the next spot
                    position.x -= 1;
                }
                break;
            } else {
                // otherwise move them to another spot
                return dispatch(
                    moveMonster(preference ? preference : Direction.North, position, currentMap, id, count),
                );
            }
        case Direction.East:
            nextPosition = { x: position.x + 1, y: position.y };
            // see if the monster can move to the next location
            if (traversableTile(nextPosition, maps[floorNumber - 1].tiles)) {
                // if we found a monster
                if (checkForOtherMonster(id, nextPosition, getState().monsters.entities[currentMap])) {
                    // move in a circle, but the opposite direction
                    return dispatch(
                        moveMonster(preference ? preference : Direction.North, position, currentMap, id, count),
                    );
                } else {
                    // otherwise just move to the next spot
                    position.x += 1;
                }
                break;
            } else {
                // otherwise move them to another spot
                return dispatch(
                    moveMonster(preference ? preference : Direction.South, position, currentMap, id, count),
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

export default moveMonster;
