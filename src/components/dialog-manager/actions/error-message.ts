import { RootThunk } from "../../../store";
import { notifyPlayer } from "../../../store/snackbar/actions";

const errorMessage = (errorMessage: string): RootThunk => async (dispatch): Promise<void> => {
    dispatch(notifyPlayer(errorMessage));
};

export default errorMessage;
