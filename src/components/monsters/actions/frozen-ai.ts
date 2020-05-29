import { RootThunk } from "../../../store";
import { revealMonster, hideMonster, resetMonsterAI } from "../../../store/monsters/actions";

import { Point, Monster } from "../../../types";

import { isInFieldOfView } from "./move-monster";

/**
 * The monster can't move, so all this really does is reveal the monster
 * if they're in view, hide them if they're not, and then reverts their AI
 * if they're unfrozen.
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param  monster The monster we're moving
 */
export const frozen = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
): Promise<void> => {
    const { id, type, location, aiTurns, originalAI, ai } = monster;

    const monsterVisible = isInFieldOfView(sightBox, location);

    if (monsterVisible) {
        dispatch(revealMonster(id, currentMap));
    } else {
        // monster is too far away from the player
        dispatch(hideMonster(id, currentMap));
    }

    if (aiTurns === 0) {
        dispatch(resetMonsterAI(currentMap, id, type, originalAI, ai));
    }
};
