import { RootThunk } from "../../../store";
import { monsterDied, damageToMonster, resetMonsterAI } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";
import { pause } from "../../../store/dialog/actions";
import { gainExperience } from "../../../store/stats/actions";

import { Point, Monster } from "../../../types";
import { TURNS_FOR_POISON, POISON_DAMAGE } from "../../../constants";

import { moveNormally } from "./normal-ai";

/**
 * An AI used for monsters that have been poisoned, and will apply poison damage over time
 *
 * @param sightBox The players FOV
 * @param currentMap The map the player is in
 * @param monster The monster we're moving
 */
export const poisoned = (sightBox: Point[], currentMap: string, monster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { stats } = getState();
    const { id, type, health, experience, location, aiTurns, originalAI, ai } = monster;

    dispatch(moveNormally(sightBox, currentMap, monster));

    let dead = false;

    if (aiTurns % TURNS_FOR_POISON === TURNS_FOR_POISON - 1) {
        const damage = POISON_DAMAGE.roll(false);

        dispatch(damageToMonster(damage, id, currentMap, type, "poison"));

        if (health - damage <= 0) {
            dead = true;
            // and get some exp
            dispatch(gainExperience(experience));

            if (stats.experience + experience >= stats.experienceToLevel) {
                dispatch(pause(true, { levelUp: true }));
            }
            // play death sound
            dispatch(monsterDied(type));

            // replace monster will blood spill
            // need to pass relative tile index
            dispatch(addBloodSpill(location));
        }
    }

    if (!dead && aiTurns === 0) {
        dispatch(resetMonsterAI(currentMap, id, type, originalAI, ai));
    }
};
