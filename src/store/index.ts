import { combineReducers, configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import WorldReducer from "./world/reducer";
import SystemReducer from "./system/reducer";
import PlayerReducer from "./player/reducer";

const rootReducer = combineReducers({
  world: WorldReducer,
  system: SystemReducer,
  player: PlayerReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export type RootThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
