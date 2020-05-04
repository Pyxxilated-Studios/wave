import { RootThunk } from "../../../store";
import { notifyPlayer } from "../../../store/snackbar/actions";

const errorMessage = (errorMessage: string): RootThunk => async (dispatch) => dispatch(notifyPlayer(errorMessage));

export default errorMessage;
