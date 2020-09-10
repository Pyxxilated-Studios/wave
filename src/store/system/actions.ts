import { useEffect } from "react";
import _debounce from "lodash.debounce";

import { store } from "../";
import { SystemActionType, SET_SIDE_MENU, RESET, SET_SOUND, LoadData, SET_ABILITY_INDICATOR } from "./types";

import useWindowSize from "../../utils/use-window-size";

import { SCREEN_SMALL_WIDTH } from "../../constants";

export const reset = (): SystemActionType => {
    return {
        type: RESET,
    };
};

export const setSideMenu = (to: boolean): SystemActionType => {
    return {
        type: SET_SIDE_MENU,
        set: to,
    };
};

export const setSound = (to: boolean): SystemActionType => {
    return {
        type: SET_SOUND,
        set: to,
    };
};

export const load = (payload: LoadData): SystemActionType => {
    return { type: "LOAD", payload };
};

export const setAbilityIndicator = (to: boolean): SystemActionType => {
    return { type: SET_ABILITY_INDICATOR, set: to };
};

const VIEWPORT_RESIZE_RATE = 250;

interface ViewportScale {
    sideMenu: boolean;
}

const updateViewportScale = (scale: ViewportScale): void => {
    store.dispatch(setSideMenu(scale.sideMenu));
};

const _updateViewportScale = _debounce(updateViewportScale, VIEWPORT_RESIZE_RATE);

export const useViewportScaling = (): void => {
    const { height, width } = useWindowSize();

    useEffect(() => {
        const sideMenu = width <= SCREEN_SMALL_WIDTH;

        _updateViewportScale({ sideMenu });
    }, [height, width]);
};
