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

const observeBoundaries = (newPos: Point): boolean => {
    return newPos.x >= 0 && newPos.x <= MAP_SIZE.width - 1 && newPos.y >= 0 && newPos.y <= MAP_SIZE.height - 1;
};

const handleInteractWithTile = (nextTile: number, newPosition: Point): RootThunk => async (dispatch): Promise<void> => {
    if (nextTile === 2 || nextTile === 3) {
        // the player wants to use the stairs
        dispatch(transitionMap());
        dispatch(walkStairs(nextTile, newPosition));
    } else if (nextTile === 4) {
        // open the chest
        dispatch(exploreChest(newPosition));
    } else {
        dispatch(playerTakeTurn());
    }
};

const checkForMonster = (position: Point, monsterList: Record<string, Entity>): string | undefined =>
    Object.keys(monsterList)
        .map((monsterId) => ({
            location: monsterList[monsterId].location,
            monsterId,
        }))
        .filter((ent) => ent.location.x === position.x && ent.location.y === position.y)
        .pop()?.monsterId;

const move = (direction: Direction): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, world, monsters } = getState();

    const oldPosition = player.position;
    const newPosition = getNewPosition(oldPosition, direction);

    const nextTile = getNextTile(getState().world, newPosition);

    if (
        nextTile < 5 &&
        observeBoundaries(newPosition) &&
        !checkForMonster(newPosition, monsters.entities[world.currentMap])
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
