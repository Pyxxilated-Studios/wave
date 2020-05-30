import { RootThunk } from "../../../store";

import { levelUp } from "../../../store/journal/actions";

const logLevelUp = (): RootThunk => async (disaptch, getState): Promise<void> => {
    const { level, health, mana } = getState().stats.levelUp;
    disaptch(levelUp(level, health, mana));
};

export default logLevelUp;
