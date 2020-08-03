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
    TAKE_TURN,
    EFFECT_PLAYER,
} from "./types";

import { Direction, Spell, SpellType } from "../../types";
import { RESET, LOAD } from "../system/types";
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
                turnsOutOfCombat:
                    action.projectile.type === "spell" && (action.projectile as Spell).kind === SpellType.Combat
                        ? 0
                        : state.turnsOutOfCombat,
            };

        case MONSTER_ATTACK:
            return {
                ...state,
                monsterAttacked: !state.monsterAttacked,
                monsterTargetLocation: { x: 0, y: 0 },
                monsterProjectile: undefined,
                turnsOutOfCombat: 0,
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

        case EFFECT_PLAYER:
            state.effects.forEach((effect) => {
                if (effect.effect === action.effect && effect.immunityTurns <= 0) {
                    effect.turns = action.turns;
                    effect.damage = action.damage;
                    effect.immunityTurns = action.turns * 3;
                    effect.from = action.from;
                }
            });

            return { ...state };

        case TAKE_TURN:
            state.effects.forEach((effect) => {
                --effect.turns;
                --effect.immunityTurns;
            });

            return { ...state, turnsOutOfCombat: state.turnsOutOfCombat + 1 };

        case LOAD:
            if (!action.payload) return initialState;

            return { ...initialState, ...action.payload.player };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default PlayerReducer;
