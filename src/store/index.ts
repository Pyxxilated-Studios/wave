import {
  combineReducers,
  Action,
  createStore,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction } from "redux-thunk";

import WorldReducer from "./world/reducer";
import SystemReducer from "./system/reducer";
import PlayerReducer from "./player/reducer";
import MapReducer from "./map/reducer";
import StatsReducer from "./stats/reducer";
import MonstersReducer from "./monsters/reducer";

const rootReducer = combineReducers({
  world: WorldReducer,
  system: SystemReducer,
  player: PlayerReducer,
  map: MapReducer,
  stats: StatsReducer,
  monsters: MonstersReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // this mixed operated is needed, otherwise you get a weird error from redux about applying funcs
    // eslint-disable-next-line
    (process.env.NODE_ENV === "development" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export type RootThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
