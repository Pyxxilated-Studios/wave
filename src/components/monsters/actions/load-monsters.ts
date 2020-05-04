import { RootThunk } from '../../../store';
import { addMonsters } from '../../../store/monsters/actions';

import generateMonsters from '../../world/actions/generate-monsters';

const loadMonsters = (): RootThunk => async (dispatch, getState) => {
    const { world, monsters, player, stats } = getState();
    const { currentMap, randomMaps, floorNumber } = world;

    if (!monsters.entities[currentMap]) {
        // let's generate some monsters and set them!
        dispatch(
            addMonsters(
                currentMap,
                generateMonsters(floorNumber, randomMaps[floorNumber - 1], player.position, stats.level),
            ),
        );
    }
};

export default loadMonsters;
