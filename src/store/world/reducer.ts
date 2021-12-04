import cloneDeep from "lodash.clonedeep";

import {
    WorldState,
    WorldActionType,
    SET_CURRENT_MAP,
    GENERATE_MAP,
    SET_START_MAP,
    MAP_TRANSITION,
    SET_CHEST_DATA,
    OPEN_CHEST,
    ADD_BLOOD_SPILL,
} from "./types";
import { EXPLORE_TILES } from "../map/types";
import { Tile, Point } from "../../types";
import { TAKE_TURN } from "../player/types";
import { RESET, LOAD } from "../system/types";

import { generate_padding_tiles } from "wave";

import attachMetaToTiles from "../../utils/attach-meta-to-tiles";
import { arrayContainsPoint } from "../../utils/array-contains";
import { getChestName } from "../../utils/get-chest-name";

const initialState: WorldState = {
    currentMap: "",
    turn: 0,
    maps: [],
    chests: {},
    floorNumber: 0,
    mapTransition: false,
};

const WorldReducer = (state = initialState, action: WorldActionType): WorldState => {
    switch (action.type) {
        case SET_CURRENT_MAP:
            return { ...state, currentMap: action.currentMap, floorNumber: action.floorNumber };

        case MAP_TRANSITION:
            return { ...state, mapTransition: !state.mapTransition };

        case TAKE_TURN:
            return { ...state, turn: state.turn + 1 };

        case ADD_BLOOD_SPILL: {
            const newState = cloneDeep(state);
            // we need this check to not override chests, stairs, etc.
            // check if the next tile is an empty one
            if (newState.maps[newState.floorNumber - 1].tiles[action.position.y][action.position.x].value === 0) {
                // set current tile to blood spill tile
                newState.maps[newState.floorNumber - 1].tiles[action.position.y][action.position.x].value = -1;
            }

            return newState;
        }

        case GENERATE_MAP: {
            const _randomMaps = cloneDeep(state.maps);

            const randomTiles = attachMetaToTiles(action.tiles);
            const randomPaddTiles = generate_padding_tiles();

            _randomMaps.push({
                tiles: randomTiles,
                id: action.id,
                paddingTiles: randomPaddTiles,
            });

            return { ...state, maps: _randomMaps };
        }

        case SET_CHEST_DATA: {
            const newState = cloneDeep(state);
            const currentMapData = newState.maps[newState.floorNumber - 1];

            if (action.data) {
                // We pass 'undefined' around if we're setting up a new chest, so here we've got an existing chest
                const { item } = action.data;

                if (!item) {
                    // This chest has either been completely looted, or there never was an item in it.
                    // This will make the chest appear to the player as open.
                    const { x, y } = action.data.position;
                    currentMapData.tiles[y][x].value = -2;
                }

                // This will either:
                //   1. Ensure any item's left in the chest are still there, or
                //   2. Ensure that the item for this chest is null (meaning it
                //      either never had an item, or it was just looted completely)
                newState.chests[getChestName(state.currentMap, action.data.position)] = {
                    position: action.data.position,
                    item,
                };
            }

            return newState;
        }

        case OPEN_CHEST: {
            const newState = cloneDeep(state);

            const chestName = getChestName(newState.currentMap, action.position);
            const chest = newState.chests[chestName];

            if (!chest) {
                // This chest hasn't been opened before, so let's generate one
                newState.chests[chestName] = { position: action.position };
            }

            return newState;
        }

        case SET_START_MAP:
            return {
                ...state,
                currentMap: action.startingMap,
                floorNumber: action.floorNumber,
            };

        case EXPLORE_TILES: {
            const newState = cloneDeep(state);

            const { tiles, paddingTiles } = action;

            const currentMapData = newState.maps[newState.floorNumber - 1];

            tiles.forEach((tile: Point) => {
                currentMapData.tiles[tile.y][tile.x].explored = true;
            });

            // check each padding tile direction and see if any
            // tiles are contained in the new sightbox
            if (paddingTiles.length > 0) {
                Object.keys(currentMapData.paddingTiles).forEach((direction) => {
                    Reflect.set(
                        currentMapData.paddingTiles,
                        direction,
                        Reflect.get(currentMapData.paddingTiles, direction).map((tileRow: Tile[]) =>
                            tileRow.forEach((tile) => {
                                tile.explored = arrayContainsPoint(paddingTiles, tile.location) || tile.explored;
                            }),
                        ),
                    );
                });
            }

            return newState;
        }

        case LOAD: {
            if (!action.payload) return initialState;

            /* eslint-disable @typescript-eslint/no-explicit-any */
            const state = {
                ...initialState,
                ...action.payload.world,
                chests: Object.entries(action.payload.world.chests).map(([, chest]: any[]) => ({
                    ...chest,
                    position: Point.deserialize(chest.position),
                })),
                maps: action.payload.world.maps.map((map: any) => {
                    return {
                        ...map,
                        tiles: map.tiles.map((row: any) => row.map((tile: any) => Tile.deserialize(tile))),
                        paddingTiles: {
                            top: map.paddingTiles.top.map((row: any) => row.map((tile: any) => Tile.deserialize(tile))),
                            bottom: map.paddingTiles.bottom.map((row: any) =>
                                row.map((tile: any) => Tile.deserialize(tile)),
                            ),
                            left: map.paddingTiles.left.map((row: any) =>
                                row.map((tile: any) => Tile.deserialize(tile)),
                            ),
                            right: map.paddingTiles.right.map((row: any) =>
                                row.map((tile: any) => Tile.deserialize(tile)),
                            ),
                        },
                    };
                }),
            };

            return state;
        }

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default WorldReducer;
