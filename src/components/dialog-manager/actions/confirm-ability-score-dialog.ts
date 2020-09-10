import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";
import { setAbilityScores } from "../../../store/stats/actions";

const confirmAbilityScoreDialog = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { abilities } = getState().dialog;

    dispatch(setAbilityScores(abilities, abilities.points));

    if (getState().dialog.reason.playerOpenedAbilityDialog) {
        dispatch(pause(false, { playerOpenedAbilityDialog: false }));
    } else {
        dispatch(pause(true, { gameInstructions: true }));
    }
};

export default confirmAbilityScoreDialog;
