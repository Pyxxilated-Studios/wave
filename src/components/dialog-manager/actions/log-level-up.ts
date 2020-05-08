import { RootThunk } from "../../../store";

const logLevelUp = (): RootThunk => async (disaptch, getState): Promise<void> => {
    // disaptch(levelUp(getState().stats.levelUp));
};

export default logLevelUp;
