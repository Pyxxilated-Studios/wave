import { RootThunk } from "../../../store";
import { revealMonster } from "../../../store/monsters/actions";

import { SIGHT_RADIUS } from "../../../constants";
import { Point, Monster } from "../../../types";

import { playerInRange } from "./move-monster";
import { moveNormally } from "./normal-ai";
import { attackPlayer } from "./attack-player";

/**
 * An AI for monsters who have the capability of using ranged attacks
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const ranged = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { position } = getState().player;
    const { id, location } = monster;

    if (playerInRange(position, location, SIGHT_RADIUS)) {
        dispatch(revealMonster(id, currentMap));
        dispatch(attackPlayer(monster));
    } else {
        dispatch(moveNormally(sightBox, currentMap, monster));
    }
};
