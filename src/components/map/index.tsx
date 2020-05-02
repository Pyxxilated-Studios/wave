import React from "react";
import { connect } from "react-redux";

import { MapState } from "../../store/map/types";
import { WorldState } from "../../store/world/types";
import { RootState } from "../../store";

interface MapProps {
  map: MapState;
  world: WorldState;
}

const Map = (props: MapProps) => {
  return <></>;
};

const mapStateToProps = (state: RootState) => ({
  map: state.map,
  world: state.world,
});

export default connect(mapStateToProps)(Map);
