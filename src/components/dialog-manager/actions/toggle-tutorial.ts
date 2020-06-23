import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";

const toggleTutorial = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { tutorialDialog, gameRunning } = getState().dialog.reason;

    if (gameRunning) {
        if (tutorialDialog) {
            dispatch(pause(false, { tutorialDialog: false, tutorialPage: "movement" }));
        } else {
            dispatch(pause(true, { tutorialDialog: true, tutorialPage: "movement" }));
        }
    } else {
        if (tutorialDialog) {
            dispatch(
                pause(true, { tutorialDialog: false, gameStart: true, gameRunning: false, tutorialPage: "movement" }),
            );
        } else {
            dispatch(pause(true, { gameRunning: false, tutorialDialog: true, tutorialPage: "movement" }));
        }
    }
};

export default toggleTutorial;
