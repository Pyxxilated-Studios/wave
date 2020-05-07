import debounce from "lodash.debounce";
import { v4 as uuidv4 } from "uuid";

import { RootThunk } from "../../../store";

import { MAP_TRANSITION_DELAY } from "../../../constants";
import { Point } from "../../../types";

import generateMap from "./generate-map";
import randomMapMessage from "./random-map-message";
import { setCurrentMap, loadMap } from "../../../store/world/actions";

const walkStairs = (nextTile: number, playerPosition: Point): RootThunk =>
    debounce(async (dispatch, getState) => {
        const { randomMaps, floorNumber } = getState().world;

        const direction = nextTile === 2 ? "down" : "up";

        if (direction === "up") {
            // conditionally show a message based on floorNum
            dispatch(randomMapMessage(floorNumber));
            // if we have reached a new floor
            if (floorNumber === randomMaps.length) {
                // generate a random map, save it, and set it as the current map
                const randomMap = generateMap(playerPosition, floorNumber + 1);
                const mapId = uuidv4();

                dispatch(loadMap(randomMap.tiles, mapId));

                dispatch(setCurrentMap(mapId, floorNumber + 1));
            } else {
                // figure out the next map and set it as the current
                dispatch(setCurrentMap(randomMaps[floorNumber].id, floorNumber + 1));
            }
        } else if (direction === "down" && floorNumber > 1) {
            // figure out the previous map and set it as the current
            dispatch(setCurrentMap(randomMaps[floorNumber - 2].id, floorNumber - 1));
        }
    }, MAP_TRANSITION_DELAY);

export default walkStairs;
