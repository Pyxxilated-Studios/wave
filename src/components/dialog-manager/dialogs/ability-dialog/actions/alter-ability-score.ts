import { RootThunk } from "../../../../../store";
import { incrementAbility, decrementAbility } from "../../../../../store/dialog/actions";

import { Ability } from "../../../../../types";

export const increment = (ability: Ability): RootThunk => async (dispatch) => dispatch(incrementAbility(ability));
export const decrement = (ability: Ability): RootThunk => async (dispatch) => dispatch(decrementAbility(ability));
