import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const mainGameDialog = (): RootThunk => async (dispatch): Promise<void> => {
    dispatch(pause(true, { gameStart: true }));
};

export default mainGameDialog;
