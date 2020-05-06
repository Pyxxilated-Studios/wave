import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const toggleInventory = (): RootThunk => async (dispatch, getState) => {
    const { inventory } = getState().dialog.reason;
    dispatch(pause(!inventory, { inventory: !inventory }));
};

export default toggleInventory;
