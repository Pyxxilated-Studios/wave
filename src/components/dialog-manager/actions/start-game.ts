import { v4 as uuidv4 } from "uuid";

import { RootThunk } from "../../../store";
import { exploreTiles } from "../../../store/map/actions";
import { loadMap, setStartMap } from "../../../store/world/actions";
import { addMonsters } from "../../../store/monsters/actions";
import { pause } from "../../../store/dialog/actions";
import { movePlayer } from "../../../store/player/actions";

import { Direction } from "../../../types";
import { MAP_DIMENSIONS } from "../../../constants";

import generateMap from "../../world/actions/generate-map";
import generateMonsters from "../../world/actions/generate-monsters";

const startGame = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats } = getState();
    const floorNumber = 1;

    const startingPosition = {
        x: Math.floor(Math.random() * (MAP_DIMENSIONS.width - 1) + 1),
        y: Math.floor(Math.random() * (MAP_DIMENSIONS.height - 1) + 1),
    };

    dispatch(movePlayer(startingPosition, Direction.South));
    // generate a random map and id
    const randomMap = generateMap(startingPosition, floorNumber);
    const mapId = uuidv4();

    dispatch(pause(true, { characterCreation: true }));

    dispatch(loadMap(randomMap.tiles, mapId));

    dispatch(setStartMap(mapId, floorNumber));

    dispatch(exploreTiles(startingPosition));

    dispatch(addMonsters(mapId, generateMonsters(floorNumber, randomMap, startingPosition, stats.level)));
};

export default startGame;
