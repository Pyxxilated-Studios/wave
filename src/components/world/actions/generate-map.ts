import generateObjects from "./generate-objects";
import {
  MAP_DIMENSIONS,
  MAX_TUNNELS,
  MAX_TUNNEL_LENGTH,
} from "../../../constants";
import { Point, GameMap } from "../../../types";

// Generates a random dungeon map
const generateMap = (startPosition: Point, floorNumber: number) => {
  // Change the walls of the dungeon as the floors get higher
  let wallType = 5;
  if (floorNumber >= 30) wallType = 6;
  if (floorNumber >= 60) wallType = 7;
  if (floorNumber >= 90) wallType = 8;

  // Create a map of walls to carve rooms and hallways from
  const map = createMapOfWalls(wallType);

  // Array to get a random direction from (left,right,up,down)
  const directions: Point[] = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  // store the max tunnels in a local variable that can be decremented
  let maxTunnels = MAX_TUNNELS;

  // our current row - start at a random spot
  let currentRow = startPosition
    ? startPosition.y
    : Math.floor(Math.random() * MAP_DIMENSIONS.height);
  // our current column - start at a random spot
  let currentColumn = startPosition
    ? startPosition.x
    : Math.floor(Math.random() * MAP_DIMENSIONS.width);

  // save the last direction we went
  let lastDirection: Point = { x: 0, y: 0 };

  // next turn/direction - holds a value from directions
  let randomDirection;

  // lets create some tunnels - while maxTunnels, MAP_DIMENSIONS, and MAX_TUNNEL_LENGTH is greater than 0.
  while (maxTunnels && MAP_DIMENSIONS && MAX_TUNNEL_LENGTH) {
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down,
    // and vice versa
    do {
      randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
    } while (
      (randomDirection.x === -lastDirection.x &&
        randomDirection.y === -lastDirection.y) ||
      (randomDirection.x === lastDirection.x &&
        randomDirection.y === lastDirection.y)
    );

    const randomLength = Math.ceil(Math.random() * MAX_TUNNEL_LENGTH); // length the next tunnel will be (max of maxLength)
    let tunnelLength = 0; // current length of tunnel being created

    // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {
      //break the loop if it is going out of the map
      if (
        (currentRow === 0 && randomDirection.x === -1) ||
        (currentColumn === 0 && randomDirection.y === -1) ||
        (currentRow === MAP_DIMENSIONS.height - 1 && randomDirection.x === 1) ||
        (currentColumn === MAP_DIMENSIONS.width - 1 && randomDirection.y === 1)
      ) {
        break;
      } else {
        map.tiles[currentRow][currentColumn].value = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
        currentRow += randomDirection.x; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentColumn += randomDirection.y;
        tunnelLength++; //the tunnel is now one longer, so lets increment that variable
      }
    }

    if (tunnelLength) {
      // update our variables unless our last loop broke before we made any part of a tunnel
      lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
      maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
    }
  }

  // all our tunnels have been created and now we run placeObjects(),
  // which will complete our map, so lets return it to our render()
  return generateObjects(map, floorNumber, startPosition, wallType);
};

// generate a map filled with wall tiles
const createMapOfWalls = (wallType: number) => {
  const map: GameMap = {
    tiles: [],
    paddingTiles: { top: [], bottom: [], left: [], right: [] },
    id: "",
  };

  for (let i = 0; i < MAP_DIMENSIONS.height; i++) {
    map.tiles.push([]);
    for (let j = 0; j < MAP_DIMENSIONS.width; j++) {
      map.tiles[i].push({
        location: { x: j, y: i },
        explored: false,
        value: wallType,
        variation: 0,
      });
    }
  }

  return map;
};

export default generateMap;
