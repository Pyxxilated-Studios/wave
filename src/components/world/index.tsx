import React from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { WorldState } from "../../store/world/types";
import { PlayerState } from "../../store/player/types";
import { SystemState } from "../../store/system/types";

import Map from "../map";
import Controls from "../controls";

interface WorldProps {
  library: typeof import("wave");
  system: SystemState;
  world: WorldState;
  player: PlayerState;
}

const World = (props: WorldProps) => {
  const mapOffset = props.system.largeView ? 180 : 155;
  const worldTop = mapOffset - props.player.position.y;
  const worldLeft = mapOffset - props.player.position.x;

  return (
    <div
      className="world__container"
      style={{
        top: worldTop,
        left: worldLeft,
      }}
    >
      <Controls />
      <Map />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  world: state.world,
  player: state.player,
  system: state.system,
});

export default connect(mapStateToProps)(World);
