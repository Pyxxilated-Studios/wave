import { RootThunk } from "../../../store";
import { movePlayer, playerTakeTurn, playerDie } from "../../../store/player/actions";
import { pause } from "../../../store/dialog/actions";
import { exploreTiles } from "../../../store/map/actions";
import { transitionMap } from "../../../store/world/actions";
import { damageToPlayer, restore } from "../../../store/stats/actions";

import { Direction, Point } from "../../../types";
import { OUT_OF_COMBAT_RANGE, PASSIVE_MANA_RESTORE_TURNS } from "../../../constants";

import walkStairs from "../../world/actions/walk-stairs";
import exploreChest from "../../world/actions/explore-chest";
import { getNewPosition, getTileAt, canMoveTo, monstersWithinRange } from "../../../utils/movement";

/**
 * Apply all effects currently ailing, or helping, the player.
 *
 * These can be things like poison, aura's, etc.
 */
export const applyEffects = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, stats } = getState();

    player.effects.forEach((effect) => {
        const { turns, damage, from } = effect;

        if (turns > 0) {
            const effectDamage = Math.floor(damage.roll(false) / 2);

            if (effectDamage > 0) {
                dispatch(damageToPlayer(effectDamage, { from }));

                if (stats.health - effectDamage <= 0) {
                    dispatch(playerDie({ from }));
                    dispatch(pause(true, { gameOver: true }));
                }
            }
        }
    });
};

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
 * Attempt to move the player. If there is something blocking their way (wall, monster, etc).
 * then don't move them.
 *
 * If the tile they are moving to is something they can interact with (shop, chest, etc),
 * then deal with that as well.
 *
 * In combat, we also want the player to only move in a new direction if they press the same key twice.
 * This enables them to turn and cast spells without really wasting a turn.
 *
 * @param direction The direction the player wants to move in
 */
const move = (direction: Direction): RootThunk => async (dispatch, getState): Promise<void> => {
    const { player, world, monsters, stats } = getState();
    const { maps, floorNumber, currentMap } = world;

    const newPosition = getNewPosition(player.position, direction);

    const nextTile = getTileAt(newPosition, maps[floorNumber - 1].tiles);

    const monstersAround =
        monstersWithinRange(newPosition, OUT_OF_COMBAT_RANGE, monsters.entities[currentMap]).length > 0;

    if (canMoveTo(newPosition, maps[floorNumber - 1].tiles, monsters.entities[currentMap])) {
        // explore new tiles
        dispatch(exploreTiles(newPosition));
        // move the player
        dispatch(movePlayer(newPosition, direction));
        // Deal with any interactions the player can perform with the next tile
        dispatch(handleInteractWithTile(nextTile, newPosition));

        if (player.turnsOutOfCombat % PASSIVE_MANA_RESTORE_TURNS === 0 && !monstersAround) {
            dispatch(restore("passive", Math.ceil(stats.maxMana / 10)));
        }
    } else {
        // Don't move the player, just have them face in the new direction
        dispatch(movePlayer(player.position, direction));

        // the player wants to use the shop
        if (nextTile === 9) {
            // show the shop dialog
            dispatch(pause(true, { shop: true }));
        } else if (nextTile === 10) {
            // the player has accessed a shrine
            // check if they have won the game
            dispatch(pause(true, { gameWin: true }));
        }
    }
};

export default move;
