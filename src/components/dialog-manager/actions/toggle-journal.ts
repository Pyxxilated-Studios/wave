import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

export const toggleJournal = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { dialog, system } = getState();
    const { journalSideMenu } = system;
    const { inventory, journalDialog } = dialog.reason;

    if (journalSideMenu) {
        dispatch(pause(inventory || false, { journalDialog: !journalDialog, inventory }));
    } else if (journalDialog) {
        dispatch(pause(inventory || false, { inventory }));
    } else if (!journalSideMenu) {
        dispatch(pause(true, { journalDialog: true }));
    }
};

export default toggleJournal;
