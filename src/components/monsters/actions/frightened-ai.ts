import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, monsterMove, resetMonsterAI } from "../../../store/monsters/actions";

import { Monster, Point, Direction } from "../../../types";

import { monsterCanMoveTo, isInFieldOfView } from "./move-monster";

// playerPosition.y !== location.y + 1 &&
// dispatch(observeImpassable(down)) &&
// !dispatch(checkForOtherMonster(id, down, currentMap))

/**
 * Move the monster in a frightened manner.
 *
 * In future it would be good to have the monster run away from the player instead of randomly moving
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const moveFrightened = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { player, monsters, world } = getState();
    const { id, location, direction } = monster;

    const possibleDirections: Point[] = [];

    const up = new Point(location.x, location.y - 1);
    if (
        monsterCanMoveTo(
            up,
            id,
            currentMap,
            player.position,
            monsters.entities[currentMap],
            world.maps[world.floorNumber - 1].tiles,
        )
    ) {
        possibleDirections.push(up);
    }

    const down = new Point(location.x, location.y + 1);
    if (
        monsterCanMoveTo(
            up,
            id,
            currentMap,
            player.position,
            monsters.entities[currentMap],
            world.maps[world.floorNumber - 1].tiles,
        )
    ) {
        possibleDirections.push(down);
    }

    const left = new Point(location.x - 1, location.y);
    if (
        monsterCanMoveTo(
            up,
            id,
            currentMap,
            player.position,
            monsters.entities[currentMap],
            world.maps[world.floorNumber - 1].tiles,
        )
    ) {
        possibleDirections.push(left);
    }

    const right = new Point(location.x + 1, location.y);
    if (
        monsterCanMoveTo(
            up,
            id,
            currentMap,
            player.position,
            monsters.entities[currentMap],
            world.maps[world.floorNumber - 1].tiles,
        )
    ) {
        possibleDirections.push(right);
    }

    if (possibleDirections.length > 0) {
        // Choose a random position to move to
        const newPosition = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        // Determine if the monster has moved/ stayed in sight
        const inSight = isInFieldOfView(sightBox, location);

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
                newPosition,
                newPosition.x < location.x ? Direction.West : newPosition.x > location.x ? Direction.East : direction,
            ),
        );
    }
};

export const frightened = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
): Promise<void> => {
    const { id, location, type, aiTurns, ai, originalAI } = monster;

    // Determine if the monster is currently visible
    const monsterVisible = isInFieldOfView(sightBox, location);

    if (monsterVisible) {
        dispatch(revealMonster(id, currentMap));
    }

    dispatch(moveFrightened(sightBox, currentMap, monster));

    if (aiTurns === 0) {
        dispatch(resetMonsterAI(currentMap, id, type, originalAI, ai));
    }
};
