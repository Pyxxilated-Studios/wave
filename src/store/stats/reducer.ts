import { StatsState, StatsType, GAIN_EXPERIENCE } from "./types";

const initialState: StatsState = {
  level: 0,
};

const StatsReducer = (state = initialState, action: StatsType): StatsState => {
  switch (action.type) {
    case GAIN_EXPERIENCE:
      return state;

    default:
      return state;
  }
};

export default StatsReducer;
