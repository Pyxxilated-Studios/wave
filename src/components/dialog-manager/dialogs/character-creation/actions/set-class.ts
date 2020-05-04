import { setCharacterClass } from "../../../../../store/dialog/actions";

const setClass = (characterClass: string): import("../../../../../store").RootThunk => async (dispatch) =>
    dispatch(setCharacterClass(characterClass));

export default setClass;
