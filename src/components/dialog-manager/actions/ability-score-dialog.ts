import { RootThunk } from "../../../store";
import { pause, setLevelUpAbilities } from "../../../store/dialog/actions";

const abilityScoreDialog = (openedByPlayer = false): RootThunk => async (dispatch, getState): Promise<void> => {
    const { abilities } = getState().stats;

    dispatch(setLevelUpAbilities(abilities));

    dispatch(pause(true, { abilityDialog: true, playerOpenedAbilityDialog: openedByPlayer }));
};

export default abilityScoreDialog;
