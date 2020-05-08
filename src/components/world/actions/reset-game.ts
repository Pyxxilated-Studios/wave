import { RootThunk } from "../../../store";
import { reset } from "../../../store/system/actions";
import { pause } from "../../../store/dialog/actions";

const resetGameState = (): RootThunk => async (dispatch): Promise<void> => {
    dispatch(reset());

    dispatch(pause(true, { gameStart: true }));
};

export default resetGameState;
