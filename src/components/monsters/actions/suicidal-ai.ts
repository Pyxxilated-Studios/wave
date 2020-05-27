import { RootThunk } from "../../../store";
import { getExperience } from "../../../store/stats/actions";
import { pause } from "../../../store/dialog/actions";
import { monsterDied } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";

import { Point, Monster } from "../../../types";

import { playerInRange } from "./move-monster";
import { moveNormally } from "./normal-ai";
import { attackPlayer } from "./attack-player";

/**
 * An AI for monsters who will deal damage to the player and die when they come in
 * contact with the player
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const suicidal = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { stats, player } = getState();
    const { location, type, experience } = monster;

    // If the player is in range, just hit them and die
    if (playerInRange(player.position, location)) {
        dispatch(attackPlayer(monster));

        dispatch(getExperience(experience));

        if (stats.experience + experience >= stats.experienceToLevel) {
            dispatch(pause(true, { levelUp: true }));
        }
        // play death sound
        dispatch(monsterDied(type));

        // replace monster will blood spill
        // need to pass relative tile index
        dispatch(addBloodSpill(location));
    } else {
        dispatch(moveNormally(sightBox, currentMap, monster));
    }
};
