import { useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { PlayerState } from "../../store/player/types";

import move, { CardinalDirection } from "./actions/move-player";

import {
  LEFT_KEY,
  A_KEY,
  UP_KEY,
  W_KEY,
  RIGHT_KEY,
  D_KEY,
  DOWN_KEY,
  S_KEY,
} from "../../constants";

interface ControlProps {
  player: PlayerState;
}

const Controls = (props: ControlProps) => {
  const { player } = props;

  const dispatch = useDispatch();

  const handleKeyPress = useCallback(
    (event: any) => {
      event.preventDefault();
      switch (event.keyCode) {
        case LEFT_KEY:
        case A_KEY:
          return dispatch(move(CardinalDirection.WEST, player));
        case UP_KEY:
        case W_KEY:
          return dispatch(move(CardinalDirection.NORTH, player));
        case RIGHT_KEY:
        case D_KEY:
          return dispatch(move(CardinalDirection.EAST, player));
        case DOWN_KEY:
        case S_KEY:
          return dispatch(move(CardinalDirection.SOUTH, player));
        default:
      }
    },
    [player, dispatch]
  );

  useEffect(() => {
    // Enable keyboard for player controls
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return null;
};

const mapStateToProps = (state: RootState) => ({ player: state.player });

export default connect(mapStateToProps)(Controls);
