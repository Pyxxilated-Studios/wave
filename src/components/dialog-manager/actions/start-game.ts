import { v4 as uuidv4 } from "uuid";

import { RootThunk } from "../../../store";
import { exploreTiles } from "../../../store/map/actions";
import { loadMap, setStartMap } from "../../../store/world/actions";
import { addMonsters } from "../../../store/monsters/actions";
import { pause } from "../../../store/dialog/actions";

import generateMap from "../../world/actions/generate-map";
import generateMonsters from "../../world/actions/generate-monsters";

const startGame = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, stats } = getState();
    const floorNumber = 1;

    // generate a random map and id
    const randomMap = generateMap(player.position, floorNumber);
    const mapId = uuidv4();

    dispatch(pause(true, { characterCreation: true }));

    dispatch(loadMap(randomMap.tiles, mapId));

    dispatch(setStartMap(mapId, floorNumber));

    dispatch(exploreTiles(player.position));

    dispatch(addMonsters(mapId, generateMonsters(floorNumber, randomMap, player.position, stats.level)));
};

export default startGame;
