import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const backToCharacterCreation = (): RootThunk => async (dispatch) => dispatch(pause(true, { characterCreation: true }));

export default backToCharacterCreation;
