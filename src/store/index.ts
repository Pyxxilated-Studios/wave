import { configureStore, combineReducers } from "@reduxjs/toolkit";

import WorldReducer from "./world/reducer";
import SystemReducer from "./system/reducer";

const rootReducer = combineReducers({
  world: WorldReducer,
  system: SystemReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export default store;
