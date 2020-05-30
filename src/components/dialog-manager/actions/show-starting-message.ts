import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const showStartingMessage = (): RootThunk => async (dispatch): Promise<void> => {
    dispatch(
        pause(true, {
            gameText: {
                title: `As <> stares into the dark dungeon, it greets them with a cold chill... and a message...`,
                body: `"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`,
            },
            gameRunning: true,
        }),
    );
};

export default showStartingMessage;
