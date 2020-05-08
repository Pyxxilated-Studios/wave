import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

// we need to ensure the chest stays open if we level up
const closeLevelUpDialog = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { chest } = getState().dialog.reason;
    dispatch(pause(chest || false, { chest }));
};

export default closeLevelUpDialog;
