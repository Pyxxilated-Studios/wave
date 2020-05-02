import cloneDeep from "lodash.clonedeep";

import { WorldState, WorldTypes, SET_CURRENT_MAP, GENERATE_MAP } from "./types";
import attachMetaToTiles from "../../utils/attach-meta-to-tiles";
import generatePaddingTiles from "../../utils/generate-padding-tiles";

const initialState: WorldState = {
  currentMap: null,
  turn: 0,
  randomMaps: [],
  chests: {},
  floorNum: 0,
  mapTransition: false,
};

const WorldReducer = (state = initialState, action: WorldTypes): WorldState => {
  switch (action.type) {
    case SET_CURRENT_MAP:
      return { ...state, currentMap: action.currentMap };

    case GENERATE_MAP:
      const _randomMaps = cloneDeep(state.randomMaps);

      const randomTiles = attachMetaToTiles(action.tiles);
      const randomPaddTiles = generatePaddingTiles();

      _randomMaps.push({
        tiles: randomTiles,
        id: action.id,
        paddingTiles: randomPaddTiles,
      });

      return { ...state, randomMaps: _randomMaps };

    default:
      return state;
  }
};

export default WorldReducer;
