import { RootThunk } from "../../../store";

import { Point, Monster } from "../../../types";
import { SIGHT_RADIUS } from "../../../constants";

import { moveNormally } from "./normal-ai";
import { playerInRange } from "./move-monster";
import { monsterCastSpell } from "./monster-cast-spell";
import { revealMonster } from "../../../store/monsters/actions";

/**
 * An AI for monsters who have the capability of casting spells
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const magical = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { position } = getState().player;
    const { id, location } = monster;

    // check if player is in range
    if (playerInRange(position, location, SIGHT_RADIUS)) {
        dispatch(revealMonster(id, currentMap));
        dispatch(monsterCastSpell(monster));
    } else {
        dispatch(moveNormally(sightBox, currentMap, monster));
    }
};
