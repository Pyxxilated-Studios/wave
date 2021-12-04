import { Point, Entity, Tile } from "../../../types";

import { monsterAtPosition, traversableTile, withinBoundary } from "../../../utils/movement";
import { radiusTiles } from "../../../utils/get-surrounding-tiles";
import { arrayContainsPoint } from "../../../utils/array-contains";
import { distance } from "../../../utils/distance";

const MONSTER_ATTACK_RADIUS = 1;

/**
 * Check to see if any other monster is at the position this monster is trying to move to
 *
 * @param id The id of the monster that's trying to move
 * @param position The position its moving to
 * @param currentMap THe map that the monsrer is in
 */
export const checkForOtherMonster = (
    id: string,
    position: Point,
    monsterList: Record<string, Entity>,
): string | undefined =>
    monsterAtPosition(position, monsterList)
        ?.filter((monsterID) => monsterID !== id)
        .pop();

/**
 * Determine whether or not a monster can move to a position
 *
 * @param position The position the monster is looking to move to
 * @param id The id of the monster
 */
export const monsterCanMoveTo = (
    position: Point,
    id: string,
    playerPosition: Point,
    entities: Record<string, Entity>,
    tiles: Tile[][],
): boolean => {
    return (
        (playerPosition.x !== position.x || playerPosition.y !== position.y) &&
        withinBoundary(position) &&
        !checkForOtherMonster(id, position, entities) &&
        traversableTile(position, tiles)
    );
};

export const playerInRange = (
    playerPosition: Point,
    monsterPosition: Point,
    range = MONSTER_ATTACK_RADIUS,
): boolean => {
    // for each tile around the monster
    return radiusTiles(monsterPosition, range).some((tile) => {
        // add the monsters location
        const { dx, dy } = distance(playerPosition, tile);

        return dx === 0 && dy === 0;
    });
};

export const isInFieldOfView = (sightbox: Point[], position: Point): boolean => arrayContainsPoint(sightbox, position);
