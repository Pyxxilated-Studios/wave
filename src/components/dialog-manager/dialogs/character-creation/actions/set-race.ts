import { RootThunk } from "../../../../../store";

import { setCharacterRace } from "../../../../../store/dialog/actions";

const setRace = (characterRace: string): RootThunk => async (dispatch) => dispatch(setCharacterRace(characterRace));

export default setRace;
