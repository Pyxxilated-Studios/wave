import generateMonsterType from "./generate-monster-type";
import getSurroundingTiles from "../../../utils/get-surrounding-tiles";
import { MAP_DIMENSIONS } from "../../../constants";
import { GameMap, Point } from "../../../types";

// generates random monsters for a random map
const generateMonsters = (
  floorNumber: number,
  map: GameMap,
  playerPosition: Point,
  playerLevel: number
) => {
  let availableTiles: Point[] = [];
  // we need to get the tiles from the surrounding tiles func,
  // then reverse the coordinates because they come back in normal notation (y, x)
  // but for the random map gen, we need them in (x, y)
  const vision = getSurroundingTiles(playerPosition);

  for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
    for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
      // some maps have their meta attached, some dont, so we need to read the value either way
      const mapValue = map.tiles[i][j].value;

      // get a list of floor tiles
      if (mapValue === 0) {
        availableTiles.push({ y: i, x: j });
      }
    }
  }

  availableTiles = availableTiles.filter((pos) => {
    // remove the available tiles that are vision tiles
    return vision.tiles.includes(pos);
  });

  // generate number of monsters for the map based on floor number and player level
  const numberMonsters =
    Math.ceil(floorNumber / playerLevel) *
    Math.round(Math.random() * (4 - 2) + 2);
  const monsterTiles = [];
  // get an array of tiles to position the random monsters
  for (let x = 0; x < numberMonsters; x++) {
    if (availableTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTiles.length);
      monsterTiles.push(availableTiles[randomIndex]);
      availableTiles.splice(randomIndex, 1);
    }
  }

  // generate the monster type and create an array of monster objects
  return monsterTiles.map((position) => {
    // reverse the position from the generated map,
    // as it is in [y, x], and now we need to change to [x, y] (normal notation)
    const type = generateMonsterType(playerLevel);

    return { position, type };
  });
};

export default generateMonsters;
