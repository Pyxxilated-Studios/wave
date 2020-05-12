import { RootThunk } from "../../../store";
import { addMonsters } from "../../../store/monsters/actions";

import generateMonsters from "../../world/actions/generate-monsters";

const loadMonsters = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { world, monsters, player, stats } = getState();
    const { currentMap, maps, floorNumber } = world;

    if (!monsters.entities[currentMap]) {
        // If no monsters exist in this map, generate some
        dispatch(
            addMonsters(currentMap, generateMonsters(floorNumber, maps[floorNumber - 1], player.position, stats.level)),
        );
    }
};

export default loadMonsters;
