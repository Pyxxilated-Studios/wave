import { Point, Direction, Entity, Tile } from "../types";

import { MAP_SIZE } from "../constants";

/**
 * Ensure the entity doesn't leave the map
 *
 * @param newPosition The position in which the entity would like to move to
 */
export const withinBoundary = (newPosition: Point): boolean =>
    newPosition.x >= 0 &&
    newPosition.x <= MAP_SIZE.width - 1 &&
    newPosition.y >= 0 &&
    newPosition.y <= MAP_SIZE.height - 1;

/**
 * Get the value of the tile at a position
 *
 * If the position lies outside the map, then return a generic tile
 *
 * @param position The position of the tile in the map
 * @param tiles The tiles in the map
 */
export const getTileAt = (position: Point, tiles: Tile[][]): number =>
    withinBoundary(position) ? tiles[position.y][position.x].value : 5;

/**
 * Check if a tile is traversable
 *
 * @param position The position of the tile we are checking
 * @param tiles The tiles that exist
 */
export const traversableTile = (position: Point, tiles: Tile[][]): boolean => getTileAt(position, tiles) < 5;

/**
 * Get a new position for the entity based on the position they are currently in,
 * as well as the direction they are heading.
 *
 * @param oldPosition The position the entity is coming from
 * @param direction  The direction they are moving in
 */
export const getNewPosition = (oldPosition: Point, direction: Direction): Point => {
    switch (direction) {
        case Direction.North:
            return { x: oldPosition.x, y: oldPosition.y - 1 };
        case Direction.South:
            return { x: oldPosition.x, y: oldPosition.y + 1 };
        case Direction.East:
            return { x: oldPosition.x + 1, y: oldPosition.y };
        case Direction.West:
            return { x: oldPosition.x - 1, y: oldPosition.y };
        default:
            return oldPosition;
    }
};

/**
 * Determine if the tile the player is trying to move to contains a monster, and if so return that monster
 *
 * @param position The position the player is trying to move to
 * @param monsterList The list of monsters in the current map
 */
export const monsterAtPosition = (position: Point, monsterList: Record<string, Entity>): string[] | undefined =>
    Object.entries(monsterList)
        .filter(([, monster]) => monster.location.x === position.x && monster.location.y === position.y)
        ?.map((monster) => monster[0]);

/**
 * Check if an entity can move to the position provided
 *
 * @param position The position the entity wishes to move to
 * @param tiles The tiles that exist in the map
 * @param entities The entities that exist in the map
 */
export const canMoveTo = (position: Point, tiles: Tile[][], entities: Record<string, Entity>): boolean =>
    traversableTile(position, tiles) && withinBoundary(position) && !monsterAtPosition(position, entities)?.length;
