import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";
import { setChestData, openChest } from "../../../store/world/actions";

import { Point } from "../../../types";

import { getChestName } from "../../../utils/get-chest-name";

const exploreChest = (position: Point): RootThunk => async (dispatch, getState): Promise<void> => {
    // replace the closed chest img with open
    const { world } = getState();
    const { chests } = world;

    const { currentMap } = world;
    const chest = chests[getChestName(currentMap, position)];

    if (chest) {
        dispatch(
            setChestData({
                gold: 0,
                experience: 0,
                item: chest.item,
                position,
                populated: true,
            }),
        );
    } else {
        dispatch(setChestData({ position, populated: false }));
    }

    dispatch(openChest(position));

    // show the chest contents
    dispatch(pause(true, { chest: true }));
};

export default exploreChest;
