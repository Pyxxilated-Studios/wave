import { pause, characterCreate } from "../../../../../store/dialog/actions";

const createCharacter = (characterName: string): import("../../../../../store").RootThunk => async (
    dispatch,
    getState,
) => {
    const { characterRace, characterClass } = getState().dialog.character;

    dispatch(characterCreate(characterName, characterClass, characterRace));

    dispatch(pause(true, { abilityDialog: true }));
};

export default createCharacter;
