import { Dispatch } from "react";
import { combineReducers, createStore, compose, applyMiddleware, AnyAction, Action } from "@reduxjs/toolkit";
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

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        (process.env.NODE_ENV === "development" &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
            compose,
    ),
);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = Dispatch<AnyAction> & ThunkDispatch<RootState, unknown, AnyAction>;
/* eslint-disable @typescript-eslint/no-explicit-any */
export type RootThunk = ThunkAction<any, RootState, unknown, Action<string | void | boolean>>;
