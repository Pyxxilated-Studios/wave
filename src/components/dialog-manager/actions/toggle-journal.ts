import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

export const toggleJournal = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { dialog, system } = getState();
    const { journalDialog } = dialog.reason;
    const { sideMenu } = system;

    const shouldPause = sideMenu && !journalDialog;

    dispatch(pause(shouldPause, { journalDialog: shouldPause }));
};

export default toggleJournal;
