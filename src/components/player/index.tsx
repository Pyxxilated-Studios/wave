import React from "react";
import { connect } from "react-redux";

import { PlayerState } from "../../store/player/types";
import { RootState } from "../../store";

import PlayerSprite from "./assets/knight_m_idle_anim_f0.png";

import "./styles.scss";
import { SPRITE_SIZE } from "../../constants";

interface PlayerProps {
  player: PlayerState;
}

const Player = (props: PlayerProps) => {
  const { x, y } = props.player.position;

  return (
    <div className="player-container" style={{ top: y, left: x }}>
      <div
        style={{
          backgroundImage: `url('${PlayerSprite}')`,
          zIndex: 100,
          width: SPRITE_SIZE,
          height: SPRITE_SIZE,
        }}
      ></div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Player);
