import { RootThunk } from "../../../store";
import { movePlayer, playerTakeTurn } from "../../../store/player/actions";
import { pause } from "../../../store/dialog/actions";
import { exploreTiles } from "../../../store/map/actions";
import { transitionMap } from "../../../store/world/actions";

import { MAP_SIZE } from "../../../constants";
import { Direction, Point, Entity } from "../../../types";

import walkStairs from "../../world/actions/walk-stairs";

import getNextTile from "../../../utils/get-next-tile";
import exploreChest from "../../world/actions/explore-chest";

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
 * Ensure the entity doesn't leave the map
 *
 * @param newPosition The position in which the entity would like to move to
 */
const observeBoundaries = (newPosition: Point): boolean =>
    newPosition.x >= 0 &&
    newPosition.x <= MAP_SIZE.width - 1 &&
    newPosition.y >= 0 &&
    newPosition.y <= MAP_SIZE.height - 1;

/**
 * Handle any interactions the player can have with tiles.
 *
 * @param tile The tile type that the player is looking to interact with
 * @param position The position at which they would like to interact with the tile
 */
const handleInteractWithTile = (tile: number, position: Point): RootThunk => async (dispatch): Promise<void> => {
    if (tile === 2 || tile === 3) {
        // The player has found some stairs, so lets make them use them
        dispatch(transitionMap());
        dispatch(walkStairs(tile, position));
    } else if (tile === 4) {
        // Open the chest at this position
        dispatch(exploreChest(position));
    } else {
        // If there is no interaction with this tile, then make them take a turn
        dispatch(playerTakeTurn());
    }
};

/**
 * Determine if the tile the player is trying to move to contains a monster
 *
 * @param position The position the player is trying to move to
 * @param monsterList The list of monsters in the current map
 */
const monsterAtPosition = (position: Point, monsterList: Record<string, Entity>): boolean =>
    Object.entries(monsterList).some(
        ([, monster]) => monster.location.x === position.x && monster.location.y === position.y,
    );

/**
 * Attempt to move the player. If there is something blocking their way (wall, monster, etc).
 * then don't move them.
 *
 * If the tile they are moving to is something they can interact with (shop, chest, etc),
 * then deal with that as well.
 *
 * @param direction The direction the player wants to move in
 */
const move = (direction: Direction): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, world, monsters } = getState();

    const oldPosition = player.position;
    const newPosition = getNewPosition(oldPosition, direction);

    const nextTile = getNextTile(getState().world, newPosition);

    if (
        nextTile < 5 &&
        observeBoundaries(newPosition) &&
        !monsterAtPosition(newPosition, monsters.entities[world.currentMap])
    ) {
        // explore new tiles
        dispatch(exploreTiles(newPosition));
        // move the player
        dispatch(movePlayer(newPosition, direction));
        // Deal with any interactions the player can perform with the next tile
        dispatch(handleInteractWithTile(nextTile, newPosition));
    } else {
        // the player wants to use the shop
        if (nextTile === 9) {
            // show the shop dialog
            dispatch(pause(true, { shop: true }));
        }

        // the player has accessed a shrine
        if (nextTile === 10) {
            // check if they have won the game
            dispatch(pause(true, { gameWin: true }));
        }
    }
};

export default move;
