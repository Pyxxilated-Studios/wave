import {
  PlayerState,
  PlayerTypes,
  PLAYER_ATTACK,
  MOVE_PLAYER,
  PLAYER_DIED,
  Direction,
} from "./types";

const initialState: PlayerState = {
  direction: Direction.SOUTH,
  position: { x: 200, y: 200 },
  playerAttacked: false,
  playerMoved: false,
  spellCast: false,
  spell: null,
  playerDied: false,
  targetPosition: { x: 0, y: 0 },
};

const PlayerReducer = (
  state = initialState,
  action: PlayerTypes
): PlayerState => {
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

    default:
      return state;
  }
};

export default PlayerReducer;
