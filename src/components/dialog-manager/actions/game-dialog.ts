import { RootThunk } from '../../../store';
import { pause } from '../../../store/dialog/actions';

const mainGameDialog = (): RootThunk => async (dispatch, getState) => {
    dispatch(pause(true, { gameStart: true }));
};
