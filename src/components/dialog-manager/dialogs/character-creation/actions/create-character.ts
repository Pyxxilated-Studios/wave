import { pause, characterCreate } from "../../../../../store/dialog/actions";

const createCharacter = (characterName: string): import("../../../../../store").RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    const { race, cclass } = getState().dialog.character;

    dispatch(characterCreate(characterName, cclass, race));

    dispatch(pause(true, { abilityDialog: true }));
};

export default createCharacter;
