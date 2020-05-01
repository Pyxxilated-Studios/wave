import React from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { WorldState } from "../../store/world/types";

interface WorldProps {
  library: typeof import("wave");
  world: WorldState;
}

const World = (props: WorldProps) => {
  return (
    <div>{props.library.compute(BigInt(100), BigInt(200)).toString()}</div>
  );
};

const mapStateToProps = (state: RootState) => ({
  world: state.world,
});

export default connect(mapStateToProps)(World);
