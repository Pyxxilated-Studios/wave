import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const closeDialog = (): RootThunk => async (dispatch): Promise<void> => {
    dispatch(pause(false, {}));
};

export default closeDialog;
