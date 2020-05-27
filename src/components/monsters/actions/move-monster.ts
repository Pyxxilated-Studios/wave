import { RootThunk } from "../../../store";
import { Point, Entity } from "../../../types";

import { monsterAtPosition, traversableTile, withinBoundary } from "../../../utils/movement";
import { radiusTiles } from "../../../utils/get-surrounding-tiles";
import { arrayContainsPoint } from "../../../utils/array-contains";

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
 * @param currentMap The current map
 */
export const monsterCanMoveTo = (position: Point, id: string, currentMap: string): RootThunk => async (
    _,
    getState,
): Promise<boolean> => {
    const { player, monsters, world } = getState();

    return (
        player.position.x !== position.x &&
        player.position.y !== position.y &&
        withinBoundary(position) &&
        !checkForOtherMonster(id, position, monsters.entities[currentMap]) &&
        traversableTile(position, world.maps[world.floorNumber - 1].tiles)
    );
};

export const playerInRange = (
    playerPosition: Point,
    monsterPosition: Point,
    range = MONSTER_ATTACK_RADIUS,
): boolean => {
    // for each tile around the monster
    return radiusTiles(range).some((tile) => {
        // add the monsters location
        const offset = { x: tile.x + monsterPosition.x, y: tile.y + monsterPosition.y };
        // see if the player is in range
        return offset.x === playerPosition.x && offset.y === playerPosition.y;
    });
};

export const isInFieldOfView = (sightbox: Point[], position: Point): boolean => arrayContainsPoint(sightbox, position);
