import React, { useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { WorldState } from "../../store/world/types";
import { PlayerState } from "../../store/player/types";
import { SystemState } from "../../store/system/types";

import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

import Map from "../map";
import Controls from "../controls";
import Monsters from "../monsters";
import Player from "../player";

import startGame from "./actions/start-game";
import takeMonstersTurn from "../monsters/actions/take-monsters-turn";

import "./styles.scss";

interface WorldProps {
  library: typeof import("wave");
  system: SystemState;
  world: WorldState;
  player: PlayerState;
}

const World = (props: WorldProps) => {
  const dispatch = useDispatch();

  const mapOffset = props.system.largeView ? 180 : 155;

  const playerSpriteCoordinates = translateToSpriteCoordinates(
    props.player.position
  );

  const worldTop = mapOffset - playerSpriteCoordinates.y;
  const worldLeft = mapOffset - playerSpriteCoordinates.x;

  const { world } = props;

  const monstersTakeTurns = useCallback(() => {
    dispatch(takeMonstersTurn());
  }, [dispatch]);

  useEffect(() => {
    monstersTakeTurns();
  }, [world.turn, monstersTakeTurns]);

  if (!props.world.currentMap) {
    dispatch(startGame());

    return null;
  }

  return (
    <div
      className="world-container"
      style={{
        top: worldTop,
        left: worldLeft,
      }}
    >
      <Controls />

      <Map />

      <Player />

      <Monsters />

      {/* <div className="world-map-transition" style={{ opacity }} /> */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  world: state.world,
  player: state.player,
  system: state.system,
});

export default connect(mapStateToProps)(World);
