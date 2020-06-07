import { RootThunk } from "../../../store";
import { toggleSettings } from "../../../store/dialog/actions";
import { load } from "../../../store/system/actions";

const loadGame = (file: File): RootThunk => async (dispatch): Promise<void> => {
    const reader = new FileReader();

    reader.onload = (event): void => {
        if (!event.target) return;

        const content = event.target.result;
        if (!content) return;

        const data = JSON.parse(content.toString());

        dispatch(load(data));

        // Close the settings dialog, because it would have been saved with it open
        dispatch(toggleSettings());
    };

    reader.readAsText(file, "UTF-8");
};

export default loadGame;
