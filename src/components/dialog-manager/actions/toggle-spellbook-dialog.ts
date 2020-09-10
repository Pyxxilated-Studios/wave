import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const toggleSpellbookDialog = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { reason } = getState().dialog;
    const { spellbookDialog } = reason;

    const paused = !(spellbookDialog || false);

    dispatch(pause(paused, { spellbookDialog: paused }));
};

export default toggleSpellbookDialog;
