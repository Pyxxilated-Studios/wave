import { combineReducers, createStore, compose, applyMiddleware, AnyAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import WorldReducer from "./world/reducer";
import SystemReducer from "./system/reducer";
import PlayerReducer from "./player/reducer";
import MapReducer from "./map/reducer";
import StatsReducer from "./stats/reducer";
import MonstersReducer from "./monsters/reducer";
import DialogReducer from "./dialog/reducer";
import SnackbarReducer from "./snackbar/reducer";
import InventoryReducer from "./inventory/reducer";
import JournalReducer from "./journal/reducer";
import { Dispatch } from "react";

const rootReducer = combineReducers({
    world: WorldReducer,
    system: SystemReducer,
    player: PlayerReducer,
    map: MapReducer,
    stats: StatsReducer,
    monsters: MonstersReducer,
    dialog: DialogReducer,
    snackbar: SnackbarReducer,
    inventory: InventoryReducer,
    journal: JournalReducer,
});

const persistConfig = {
    key: "wave",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        (process.env.NODE_ENV === "development" &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
            compose,
    ),
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, {}, AnyAction>;
export type RootThunk = ThunkAction<any, RootState, unknown, Action<string | void | boolean>>;
