import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";
import { getGold, gainExperience } from "../../../store/stats/actions";

const closeChestDialog = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { dialog, stats } = getState();

    if (!dialog.chestOpen) {
        return;
    }

    const { gold, experience } = dialog.chestOpen;

    dispatch(pause(false, {}));

    if (gold && gold > 0) {
        dispatch(getGold(gold));
    }

    if (experience && experience > 0) {
        dispatch(gainExperience(experience));

        if (experience + stats.experience >= stats.experienceToLevel) {
            dispatch(pause(true, { levelUp: true, chest: false }));
        }
    }
};

export default closeChestDialog;
