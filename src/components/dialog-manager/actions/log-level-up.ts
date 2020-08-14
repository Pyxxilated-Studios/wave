import { RootThunk } from "../../../store";

import { levelUp } from "../../../store/journal/actions";
import { isAbilityAllocationLevel } from "../../../utils/is-ability-allocation-level";
import { setAbilityIndicator } from "../../../store/system/actions";

const logLevelUp = (): RootThunk => async (disaptch, getState): Promise<void> => {
    const { level, health, mana } = getState().stats.levelUp;
    disaptch(levelUp(level, health, mana));

    if (isAbilityAllocationLevel(level)) {
        disaptch(setAbilityIndicator(true));
    }
};

export default logLevelUp;
