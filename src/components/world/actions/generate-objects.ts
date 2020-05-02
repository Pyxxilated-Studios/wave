import { Point, Tile, GameMap } from "../../../types";

import arrayContainsArray from "../../../utils/array-contains-array";
import getSurroundingTiles from "../../../utils/get-surrounding-tiles";
import { MAP_DIMENSIONS } from "../../../constants";

import * as wave from "wave";

// Randomly generates chests, stairs and shops onto an existing random map
const generateObjects = (
  map: GameMap,
  floorNumber: number,
  playerPosition: Point,
  wallType: number
) => {
  const initialTiles: Point[] = [];

  // we need to get the tiles from the surrounding tiles func,
  // then reverse the coordinates because they come back in normal notation (y, x)
  // but for the random map gen, we need them in (x, y)
  const vision = getSurroundingTiles(playerPosition);

  for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
    for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
      // get a list of floor tiles
      if (map.tiles[i][j].value === 0) {
        initialTiles.push({ x: i, y: j });
      }
    }
  }

  const availableTiles = initialTiles.filter((value) => {
    // remove the available tiles that are vision tiles
    return !arrayContainsArray(vision.tiles, value);
  });

  // show stairs down if floor is greater than 1
  if (floorNumber > 1) {
    map.tiles[playerPosition.y][playerPosition.x].value = 2;
  }

  // generate stairs up OUTSIDE the player's sight if possible
  if (availableTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const tile = availableTiles[randomIndex];

    map.tiles[tile.y][tile.x].value = 3;
    availableTiles.splice(randomIndex, 1);
  } // if we don't have room outside player sight, place stairs on any floor tile
  else {
    const randomIndex = Math.floor(Math.random() * initialTiles.length);
    const tile = initialTiles[randomIndex];
    // if the tile is occupied by the player
    // remove the player's position from available tiles and get another random one
    if (tile.y === playerPosition.y && tile.x === playerPosition.x) {
      initialTiles.splice(randomIndex, 1);

      const newRandomIndex = Math.floor(Math.random() * initialTiles.length);
      const newTile = initialTiles[newRandomIndex];

      map.tiles[newTile.y][newTile.x].value = 3;
    } // safely place the stairs
    else {
      map.tiles[tile.y][tile.x].value = 3;
    }
  }

  // generate a random number of chests between 0 - 5
  const max = 5;
  const min = 0;
  const randomChests = Math.round(Math.random() * (max - min) + min);
  // place the chests on empty tiles
  for (let x = 0; x < randomChests; x++) {
    if (availableTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTiles.length);
      const tile = availableTiles[randomIndex];

      map.tiles[tile.y][tile.x].value = 4;
      availableTiles.splice(randomIndex, 1);
    }
  }

  // generate a shop every 4 floors
  if (floorNumber % 4 === 0) {
    const availableWalls: Point[] = [];

    // get a list of available wall tiles
    for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
      for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
        // make sure the wall tile touches a path so it can be reached
        if (
          map.tiles[i][j].value === wallType &&
          ((i - 1 > 0 && map.tiles[i - 1][j].value === 0) ||
            (i + 1 < MAP_DIMENSIONS.height &&
              map.tiles[i + 1][j].value === 0) ||
            (j - 1 > 0 && map.tiles[i][j - 1].value === 0) ||
            (j + 1 < MAP_DIMENSIONS.width && map.tiles[i][j + 1].value === 0))
        ) {
          availableWalls.push({ x: i, y: j });
        }
      }
    }

    map = generateShop(map, availableWalls);
  }

  return map;
};

function generateShop(map: GameMap, availableWalls: Point[]) {
  if (availableWalls.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableWalls.length);
    const tile = availableWalls[randomIndex];

    map.tiles[tile.y][tile.x].value = 9;
  }
  return map;
}

export default generateObjects;
