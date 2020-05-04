import { PlayerState, PlayerActionType, PLAYER_ATTACK, MOVE_PLAYER, PLAYER_DIED } from './types';

import { Direction } from '../../types';
import { RESET } from '../system/types';

const initialState: PlayerState = {
    direction: Direction.South,
    position: { x: 0, y: 0 },
    playerAttacked: false,
    playerMoved: false,
    spellCast: false,
    spell: null,
    playerDied: false,
    targetPosition: { x: 0, y: 0 },
};

const PlayerReducer = (state = initialState, action: PlayerActionType): PlayerState => {
    switch (action.type) {
        case PLAYER_ATTACK:
            return { ...state, playerAttacked: !state.playerAttacked };

        case MOVE_PLAYER:
            return {
                ...state,
                position: action.position,
                direction: action.direction,
            };

        case PLAYER_DIED:
            return { ...state, playerDied: true };

        case RESET:
            return { ...initialState };

        default:
            return state;
    }
};

export default PlayerReducer;
