import { v4 as uuidv4 } from "uuid";

import { RootThunk } from "../../../store";
import { exploreTiles } from "../../../store/map/actions";
import { loadMap, setStartMap } from "../../../store/world/actions";
import { addMonsters } from "../../../store/monsters/actions";

import generateMap from "./generate-map";
import generateMonsters from "./generate-monsters";
// import generateMonsters from "./generate-monsters";

const startGame = (): RootThunk => async (dispatch, getState) => {
  const { player } = getState();
  const floorNumber = 1;

  // generate a random map and id
  const randomMap = generateMap(player.position, floorNumber);
  const mapId = uuidv4();

  // dispatch(pause({ reason: "characterCreation" }));
  //   type: "PAUSE",
  //   payload: {
  //     pause: true,
  //     characterCreation: true,
  //   },
  // });

  dispatch(loadMap(randomMap.tiles, mapId));

  dispatch(setStartMap(mapId, floorNumber));

  dispatch(exploreTiles(player.position));

  dispatch(
    addMonsters(
      mapId,
      generateMonsters(floorNumber, randomMap, player.position, 1)
    )
  );

  // dispatch({
  //   type: "ADD_MONSTERS",
  //   payload: {
  //     monsters: generateMonsters(
  //       floorNum,
  //       randomMap,
  //       player.position,
  //       stats.level
  //     ),
  //     map: mapId,
  //   },
  // });

  // dispatch({
  //   type: "GET_ITEM",
  //   payload: items.weapons.RustySword,
  // });

  // dispatch({
  //   type: "EQUIP_ITEM",
  //   payload: getState().inventory.items[0],
  // });
};

export default startGame;
