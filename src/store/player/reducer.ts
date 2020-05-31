import {
    PlayerState,
    PlayerActionType,
    PLAYER_ATTACK,
    MOVE_PLAYER,
    PLAYER_DIED,
    USE_PROJECTILE,
    MONSTER_USE_PROJECTILE,
    MONSTER_ATTACK,
    SET_ACTIVE_SPELL,
} from "./types";

import { Direction } from "../../types";
import { RESET } from "../system/types";
import { MONSTER_DIED } from "../monsters/types";

const initialState: PlayerState = {
    direction: Direction.South,
    position: { x: 0, y: 0 },
    playerAttacked: false,
    playerMoved: false,
    projectileUsed: undefined,
    spell: undefined,
    playerDied: false,
    targetLocation: { x: 0, y: 0 },
    turnsOutOfCombat: 0,
    monsterAttacked: false,
    monsterDied: false,
    monsterLocation: { x: 0, y: 0 },
    monsterTargetLocation: { x: 0, y: 0 },
    monsterProjectile: undefined,
    monsterProjectileDirection: Direction.North,
    effects: [],
};

const PlayerReducer = (state = initialState, action: PlayerActionType): PlayerState => {
    switch (action.type) {
        case PLAYER_ATTACK:
            return { ...state, playerAttacked: !state.playerAttacked, projectileUsed: undefined };

        case MOVE_PLAYER:
            return {
                ...state,
                position: action.position,
                direction: action.direction,
            };

        case PLAYER_DIED:
            return { ...state, playerDied: true };

        case MONSTER_DIED:
            return { ...state, monsterDied: !state.monsterAttacked };

        case USE_PROJECTILE:
            return {
                ...state,
                playerAttacked: !state.playerAttacked,
                projectileUsed: action.projectile,
                targetLocation: action.target,
                turnsOutOfCombat: 0,
            };

        case MONSTER_ATTACK:
            return {
                ...state,
                monsterAttacked: !state.monsterAttacked,
                monsterTargetLocation: { x: 0, y: 0 },
                monsterProjectile: undefined,
            };

        case MONSTER_USE_PROJECTILE:
            return {
                ...state,
                monsterAttacked: !state.monsterAttacked,
                monsterLocation: action.location,
                monsterTargetLocation: action.targetLocation,
                monsterProjectile: action.projectile,
                monsterProjectileDirection: action.direction,
            };

        case SET_ACTIVE_SPELL:
            return { ...state, spell: action.spell };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default PlayerReducer;
