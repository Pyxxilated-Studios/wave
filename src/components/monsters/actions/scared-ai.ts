import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, monsterMove, resetMonsterAI } from "../../../store/monsters/actions";

import { checkForOtherMonster, isInFieldOfView, monsterCanMoveTo } from "./move-monster";
import { Point, Monster, Direction } from "../../../types";

import { attackMonster } from "./attack-monster";
/**
 * An AI for monsters that have been scared by the player
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
const moveScared = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { player, monsters, world } = getState();
    const { id, location, direction } = monster;

    const possibleDirections: Point[] = [];

    const up = { x: location.x, y: location.y - 1 };
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

    const down = { x: location.x, y: location.y + 1 };
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

    const left = { x: location.x - 1, y: location.y };
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

    const right = { x: location.x + 1, y: location.y };
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
        const newPosition = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        // recalculate if the monster is in sight
        const inSight = isInFieldOfView(sightBox, newPosition);

        // if the monster is now in sight
        if (inSight) {
            dispatch(revealMonster(id, currentMap));
        } else {
            // if the monster is now out of sight
            dispatch(hideMonster(id, currentMap));
        }

        // From testing, this doesn't really happen... But, if the monster is scared,
        // it may randomly attack other monsters if they're in thise ones way
        const { monsters } = getState();
        const monsterID = checkForOtherMonster(id, newPosition, monsters.entities[currentMap]);

        if (monsterID) {
            dispatch(attackMonster(monster, monsterID, currentMap));
        } else {
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
                    newPosition.x < location.x
                        ? Direction.West
                        : newPosition.x > location.y
                        ? Direction.East
                        : direction,
                ),
            );
        }
    }
};

export const scared = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
): Promise<void> => {
    const { id, location, aiTurns, type, originalAI, ai } = monster;

    const monsterVisible = isInFieldOfView(sightBox, location);
    if (monsterVisible) {
        dispatch(revealMonster(id, currentMap));
    }

    dispatch(moveScared(sightBox, currentMap, monster));

    if (aiTurns === 0) {
        dispatch(resetMonsterAI(currentMap, id, type, originalAI, ai));
    }
};
