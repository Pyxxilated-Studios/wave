import { useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { PlayerState } from "../../store/player/types";
import { Direction } from "../../types";

import move from "./actions/move-player";

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

const Controls = (_props: ControlProps) => {
  const dispatch = useDispatch();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent): any => {
      event.preventDefault();
      switch (event.keyCode) {
        case UP_KEY:
        case W_KEY:
          return dispatch(move(Direction.North));
        case DOWN_KEY:
        case S_KEY:
          return dispatch(move(Direction.South));
        case RIGHT_KEY:
        case D_KEY:
          return dispatch(move(Direction.East));
        case LEFT_KEY:
        case A_KEY:
          return dispatch(move(Direction.West));
        default:
      }
    },
    [dispatch]
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
