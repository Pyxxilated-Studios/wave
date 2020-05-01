import { configureStore } from "@reduxjs/toolkit";

import WorldReducer from "./world/reducer";

const store = configureStore({
  reducer: {
    world: WorldReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
