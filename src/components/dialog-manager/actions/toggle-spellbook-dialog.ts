import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const toggleSpellbookDialog = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { paused, reason } = getState().dialog;

    dispatch(pause(!paused, { spellbookDialog: !reason.spellbookDialog }));
};

export default toggleSpellbookDialog;
