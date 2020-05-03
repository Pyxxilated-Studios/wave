import cloneDeep from "lodash.clonedeep";

import {
  WorldState,
  WorldTypes,
  SET_CURRENT_MAP,
  GENERATE_MAP,
  SET_START_MAP,
} from "./types";
import attachMetaToTiles from "../../utils/attach-meta-to-tiles";
import generatePaddingTiles from "../../utils/generate-padding-tiles";
import { EXPLORE_TILES } from "../map/types";
import { Tile, Point } from "../../types";
import { TAKE_TURN } from "../player/types";

const initialState: WorldState = {
  currentMap: "",
  turn: 0,
  randomMaps: [],
  chests: {},
  floorNumber: 0,
  mapTransition: false,
};

const WorldReducer = (state = initialState, action: WorldTypes): WorldState => {
  switch (action.type) {
    case SET_CURRENT_MAP:
      return { ...state, currentMap: action.currentMap };

    case TAKE_TURN:
      return { ...state, turn: state.turn + 1 };

    case GENERATE_MAP: {
      const _randomMaps = cloneDeep(state.randomMaps);

      const randomTiles = attachMetaToTiles(action.tiles);
      const randomPaddTiles = generatePaddingTiles();

      _randomMaps.push({
        tiles: randomTiles,
        id: action.id,
        paddingTiles: randomPaddTiles,
      });

      return { ...state, randomMaps: _randomMaps };
    }

    case SET_START_MAP:
      return {
        ...state,
        currentMap: action.startingMap,
        floorNumber: action.floorNumber,
      };

    case EXPLORE_TILES: {
      const newState = cloneDeep(state);

      const { tiles, paddingTiles } = action;

      const currentMapData = newState.randomMaps[newState.floorNumber - 1];
      // get each tile
      tiles.forEach((tile: Point) => {
        currentMapData.tiles[tile.y][tile.x].explored = true;
      });

      // check each padding tile direction and see if any
      // tiles are contained in the new sightbox
      if (paddingTiles.length > 0) {
        Object.keys(currentMapData.paddingTiles).forEach((direction) => {
          Reflect.set(
            currentMapData.paddingTiles,
            direction,
            Reflect.get(currentMapData.paddingTiles, direction).map(
              (tileRow: Tile[]) => {
                return tileRow.map((tile) => {
                  if (paddingTiles.includes(tile.location)) {
                    tile.explored = true;
                  }
                  return tile;
                });
              }
            )
          );
        });
      }

      return newState;
    }

    default:
      return state;
  }
};

export default WorldReducer;
