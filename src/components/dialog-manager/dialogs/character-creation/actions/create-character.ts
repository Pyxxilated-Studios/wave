import { pause, characterCreate } from "../../../../../store/dialog/actions";
import { RootThunk } from "../../../../../store";

const createCharacter = (characterName: string): RootThunk => async (dispatch, getState): Promise<void> => {
    const { race, cclass } = getState().dialog.character;

    dispatch(characterCreate(characterName, cclass, race));

    dispatch(pause(true, { abilityDialog: true }));
};

export default createCharacter;
