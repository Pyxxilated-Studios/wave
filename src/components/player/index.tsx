import React from "react";
import { connect } from "react-redux";

import { PlayerState } from "../../store/player/types";
import { RootState } from "../../store";

import "./styles.scss";

interface PlayerProps {
  player: PlayerState;
}

const Player = (props: PlayerProps) => {
  const { x, y } = props.player.position;

  return (
    <div className="player-container" style={{ top: y, left: x }}>
      <p>Hello!</p>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Player);
