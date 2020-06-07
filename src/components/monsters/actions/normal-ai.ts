import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, monsterMove } from "../../../store/monsters/actions";

import { Direction, Monster, Point } from "../../../types";

import { distance } from "../../../utils/distance";

import { attackPlayer } from "./attack-player";
import { playerInRange, monsterCanMoveTo, isInFieldOfView } from "./move-monster";

/**
 * Shuffles array in place using the Fisher-Yates Shuffle algorithm
 *
 * @param a items An array containing the items.
 */
const shuffle = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = array[i];
        array[i] = array[j];
        array[j] = x;
    }

    return array;
};

/**
 * Generate a list of ranked ordered positions to move in, based on where the player is in relation
 * to the monsters location.
 *
 * @param location The monsters location
 * @param playerPosition The players position
 */
const makeRankedPositions = (location: Point, playerPosition: Point): Point[] => {
    const difference = distance(location, playerPosition);

    const rankedPositions = [];

    if (difference.dy < 0) {
        rankedPositions.push({ x: location.x, y: location.y + 1 });

        if (difference.dx <= 0) {
            rankedPositions.push({ x: location.x + 1, y: location.y });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x - 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y - 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y - 1 });
                rankedPositions.push({ x: location.x - 1, y: location.y });
            }
        } else {
            rankedPositions.push({ x: location.x - 1, y: location.y });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x + 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y - 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y - 1 });
                rankedPositions.push({ x: location.x + 1, y: location.y });
            }
        }
    } else if (difference.dy > 0) {
        rankedPositions.push({ x: location.x, y: location.y - 1 });

        if (difference.dx <= 0) {
            rankedPositions.push({ x: location.x + 1, y: location.y });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x + 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y + 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y + 1 });
                rankedPositions.push({ x: location.x + 1, y: location.y });
            }
        } else {
            rankedPositions.push({ x: location.x - 1, y: location.y });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x + 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y + 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y + 1 });
                rankedPositions.push({ x: location.x + 1, y: location.y });
            }
        }
    } else if (difference.dx < 0) {
        rankedPositions.push({ x: location.x + 1, y: location.y });

        if (difference.dy <= 0) {
            rankedPositions.push({ x: location.x, y: location.y + 1 });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x - 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y - 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y - 1 });
                rankedPositions.push({ x: location.x - 1, y: location.y });
            }
        } else {
            rankedPositions.push({ x: location.x, y: location.y - 1 });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x - 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y + 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y + 1 });
                rankedPositions.push({ x: location.x - 1, y: location.y });
            }
        }
    } else {
        rankedPositions.push({ x: location.x - 1, y: location.y });

        if (difference.dy <= 0) {
            rankedPositions.push({ x: location.x, y: location.y + 1 });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x + 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y - 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y - 1 });
                rankedPositions.push({ x: location.x + 1, y: location.y });
            }
        } else {
            rankedPositions.push({ x: location.x, y: location.y - 1 });

            if (Math.abs(difference.dx) < Math.abs(difference.dy)) {
                rankedPositions.push({ x: location.x + 1, y: location.y });
                rankedPositions.push({ x: location.x, y: location.y + 1 });
            } else {
                rankedPositions.push({ x: location.x, y: location.y + 1 });
                rankedPositions.push({ x: location.x + 1, y: location.y });
            }
        }
    }

    return rankedPositions;
};

/**
 * Move in a ranked position order -- such that if the player is up and to the left, then the monster will first try to
 * move up, and then trying to move left if it fails to do so. The other two directions are not important, but are used
 * when not able to move in the preferred direction.
 *
 * @param monster
 * @param currentMap
 */
export const move = (monster: Monster, currentMap: string): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, world, monsters } = getState();
    const { id, location, direction } = monster;

    const rankedPositions = makeRankedPositions(location, player.position);

    const position =
        rankedPositions.find((position) =>
            monsterCanMoveTo(
                position,
                id,
                currentMap,
                player.position,
                monsters.entities[currentMap],
                world.maps[world.floorNumber - 1].tiles,
            ),
        ) || location;

    // recalculate if the monster is in sight
    const inSight = isInFieldOfView(getState().map.sightBox, position);

    // if the monster is now in sight
    if (inSight) {
        dispatch(revealMonster(id, currentMap));
    } else {
        // if the monster is now out of sight
        dispatch(hideMonster(id, currentMap));
    }

    // move the monster
    dispatch(
        monsterMove(
            id,
            currentMap,
            position,
            position.x < location.x ? Direction.West : position.x > location.x ? Direction.East : direction,
        ),
    );
};

export const moveNormally = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { player, monsters, world } = getState();
    const { id, location, direction } = monster;

    const monsterVisible = isInFieldOfView(sightBox, location);

    if (monsterVisible) {
        dispatch(revealMonster(id, currentMap));

        // check if player is in range
        if (playerInRange(player.position, location)) {
            dispatch(attackPlayer(monster));
        } else {
            // The player isn't in range, but they are within our field of view
            dispatch(move(monster, currentMap));
        }
    } else {
        // monster is too far away from the player
        dispatch(hideMonster(id, currentMap));

        // Give monsters a chance to move
        if (Math.floor(Math.random() * 4) + 1 !== 4) {
            const position =
                shuffle(makeRankedPositions(location, player.position)).find((position) =>
                    monsterCanMoveTo(
                        position,
                        id,
                        currentMap,
                        player.position,
                        monsters.entities[currentMap],
                        world.maps[world.floorNumber - 1].tiles,
                    ),
                ) || location;

            dispatch(
                monsterMove(
                    id,
                    currentMap,
                    position,
                    position.x < location.x ? Direction.West : position.x > location.x ? Direction.East : direction,
                ),
            );
        }
    }
};
