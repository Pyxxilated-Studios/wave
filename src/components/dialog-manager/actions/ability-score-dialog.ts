import { RootThunk } from "../../../store";
import { pause, setLevelUpAbilities } from "../../../store/dialog/actions";

import { LEVEL_UP_ABILITY_POINTS } from "../../../constants";

const abilityScoreDialog = (fromLevelUp: boolean): RootThunk => async (dispatch, getState): Promise<void> => {
    // fromLevelUp tells us if we were called from the level up dialog or not
    const { abilities } = getState().stats;

    if (fromLevelUp) {
        abilities.points += LEVEL_UP_ABILITY_POINTS;
    }

    dispatch(setLevelUpAbilities(abilities));

    dispatch(pause(true, { abilityDialog: true, fromLevelUp, playerOpenedAbilityDialog: !fromLevelUp }));
};

export default abilityScoreDialog;
