import { RootThunk } from "../../../store";
import { damageToMonster, monsterDied } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";
import { monsterAbilityCheck } from "../../../store/journal/actions";

import { Monster } from "../../../types";

export const attackMonster = (
    attackingMonster: Monster,
    defendingMonsterID: string,
    currentMap: string,
): RootThunk => async (dispatch, getState): Promise<void> => {
    const defender = getState().monsters.entities[currentMap][defendingMonsterID] as Monster;

    const { dice, attackValue } = attackingMonster;
    const { defence, type, health, location } = defender;

    const attack = attackValue.roll();
    const calculatedMonsterDamage = attack >= Math.max(defence, 0) ? dice.roll() : 0;

    dispatch(monsterAbilityCheck(attack, Math.max(defence, 0), "defence", attackingMonster.type, type));

    if (calculatedMonsterDamage > 0) {
        // show the attack animation and play sound
        // dispatch({
        //     type: 'MONSTER_ATTACK',
        //     payload: null,
        // });
    }

    dispatch(damageToMonster(calculatedMonsterDamage, defendingMonsterID, currentMap, type, attackingMonster.type));

    // check if player died
    if (health - calculatedMonsterDamage <= 0) {
        dispatch(monsterDied(type));

        // replace monster with blood spill
        dispatch(addBloodSpill(location));
    }
};
