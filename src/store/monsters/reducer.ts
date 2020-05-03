import cloneDeep from "lodash.clonedeep";
import { v4 as uuidv4 } from "uuid";

import {
  MonstersState,
  MonstersTypes,
  ADD_MONSTERS,
  REVEAL_MONSTER,
  HIDE_MONSTER,
  MONSTER_MOVE,
} from "./types";
import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

const initialState: MonstersState = {
  entities: {},
};

const MonstersReducer = (
  state = initialState,
  action: MonstersTypes
): MonstersState => {
  switch (action.type) {
    case REVEAL_MONSTER: {
      const newState = cloneDeep(state);
      newState.entities[action.currentMap][action.id].visible = true;
      return newState;
    }

    case HIDE_MONSTER: {
      const newState = cloneDeep(state);
      newState.entities[action.currentMap][action.id].visible = false;
      return newState;
    }

    case MONSTER_MOVE: {
      const newState = cloneDeep(state);
      newState.entities[action.currentMap][action.id].location =
        action.position;
      return newState;
    }

    case ADD_MONSTERS: {
      const newState = cloneDeep(state);

      // Save monsters by the map
      if (!newState.entities[action.currentMap]) {
        newState.entities[action.currentMap] = {};
        // render monsters
        action.monsters.forEach((monster) => {
          // generate a unique id (for tracking purposes)
          const uuid = uuidv4();
          // merge the id, monster stats, and position
          // set the position from tile(x,y) to actual pixel size
          monster = {
            id: uuid,
            location: translateToSpriteCoordinates(monster.location),
            visible: false,
            ...monster,
          };
          newState.entities[action.currentMap][uuid] = monster;
        });
      }

      return newState;
    }

    default:
      return state;
  }
};

export default MonstersReducer;
