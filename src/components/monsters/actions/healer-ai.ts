import { RootThunk } from "../../../store";

import { Monster, Point } from "../../../types";

import { moveNormally } from "./normal-ai";
import { monsterCastSpell } from "./monster-cast-spell";
import { isInFieldOfView } from "./move-monster";
import { hideMonster } from "../../../store/monsters/actions";

/**
 * An AI for monsters who have the capability of healing themselves
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param  monster The monster we're moving
 */
export const healer = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
): Promise<void> => {
    const { id, location, health, maxHealth } = monster;

    const monsterVisible = isInFieldOfView(sightBox, location);

    if (monsterVisible) {
        if (health <= maxHealth / 2) {
            // Attempt to heal some health
            dispatch(monsterCastSpell(monster));
        } else {
            dispatch(moveNormally(sightBox, currentMap, monster));
        }
    } else {
        dispatch(hideMonster(id, currentMap));
    }
};
