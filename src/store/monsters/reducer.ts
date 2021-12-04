import cloneDeep from "lodash.clonedeep";
import { v4 as uuidv4 } from "uuid";

import {
    MonstersState,
    MonstersActionType,
    ADD_MONSTERS,
    REVEAL_MONSTER,
    HIDE_MONSTER,
    MONSTER_MOVE,
    DAMAGE_TO_MONSTER,
    CHANGE_AI,
} from "./types";
import { RESET, LOAD } from "../system/types";

import { Monster, Direction, Point } from "../../types";

const initialState: MonstersState = {
    entities: {},
};

const MonstersReducer = (state = initialState, action: MonstersActionType): MonstersState => {
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
            newState.entities[action.currentMap][action.id].location = action.position;
            if (action.direction === Direction.West || action.direction === Direction.East) {
                // If they move north/south then there's no need to change this
                // TODO: Is this always handled before hand (as in, when we dispatch this action)?
                (newState.entities[action.currentMap][action.id] as Monster).direction = action.direction;
            }

            (newState.entities[action.currentMap][action.id] as Monster).aiTurns -= 1;

            return newState;
        }

        case DAMAGE_TO_MONSTER: {
            const newState = cloneDeep(state);
            // subtract the damage from monster health
            (newState.entities[action.map][action.monsterId] as Monster).health -= action.amount;
            // if monster has 0 or less health, kill it
            if ((newState.entities[action.map][action.monsterId] as Monster).health <= 0) {
                delete newState.entities[action.map][action.monsterId];
            }

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
                    // Actually place the monster, providing it an id, and location
                    monster = {
                        ...monster,
                        id: uuid,
                    };
                    newState.entities[action.currentMap][uuid] = monster;
                });
            }

            return newState;
        }

        case CHANGE_AI: {
            const newState = cloneDeep(state);

            (newState.entities[action.map][action.id] as Monster).ai = action.to;
            (newState.entities[action.map][action.id] as Monster).aiTurns = action.turns;

            return newState;
        }

        case LOAD:
            if (!action.payload) return initialState;

            return {
                ...initialState,
                ...action.payload.monsters,
                entities: Object.fromEntries(
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    Object.entries(action.payload.monsters.entities).map(([id, entities]: any[]) => [
                        id,
                        Object.fromEntries(
                            Object.entries(entities).map(([i, entity]: any[]) => [
                                i,
                                {
                                    ...entity,
                                    location: Point.deserialize(entity.location),
                                },
                            ]),
                        ),
                    ]),
                ),
            };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default MonstersReducer;
