import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";
import { setAbilityScores } from "../../../store/stats/actions";

const confirmAbilityScoreDialog = (): RootThunk => async (dispatch, getState) => {
    const { abilities } = getState().dialog;

    dispatch(setAbilityScores(abilities, abilities.points));

    if (getState().dialog.reason.fromLevelUp) {
        dispatch(pause(false, { fromLevelUp: false }));
    } else if (getState().dialog.reason.playerOpenedAbilityDialog) {
        dispatch(pause(false, { playerOpenedAbilityDialog: false }));
    } else {
        dispatch(pause(true, { gameInstructions: true }));
    }
};

export default confirmAbilityScoreDialog;
