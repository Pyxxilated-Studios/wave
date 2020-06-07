import { RootThunk } from "../../../store";
import { damageToMonster, monsterDied, resetMonsterAI, monsterMove } from "../../../store/monsters/actions";
import { gainExperience } from "../../../store/stats/actions";
import { pause } from "../../../store/dialog/actions";
import { addBloodSpill } from "../../../store/world/actions";

import { Monster } from "../../../types";
import { SHOCK_DAMAGE } from "../../../constants";

/**
 * An AI for monsters that have become shocked by the player
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const shocked = (currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { stats } = getState();
    const { id, type, health, experience, location, aiTurns, originalAI, ai, direction } = monster;

    const damage = SHOCK_DAMAGE.roll(false);
    const dead = health - damage <= 0;

    dispatch(damageToMonster(damage, id, currentMap, type, "shock"));

    if (dead) {
        dispatch(gainExperience(experience));

        if (stats.experience + experience >= stats.experienceToLevel) {
            dispatch(pause(true, { levelUp: true }));
        }

        // Play death sound
        dispatch(monsterDied(type));

        // Replace monster with blood spill
        dispatch(addBloodSpill(location));
    } else {
        dispatch(monsterMove(id, currentMap, location, direction));
    }

    if (!dead && aiTurns === 0) {
        dispatch(resetMonsterAI(currentMap, id, type, originalAI, ai));
    }
};
