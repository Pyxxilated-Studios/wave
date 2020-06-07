import { useEffect } from "react";
import _debounce from "lodash.debounce";

import { store } from "../";
import { SystemActionType, SET_LARGE_VIEW, SET_SIDE_MENU, RESET, SET_SOUND, SET_SHOW_JOURNAL, LoadData } from "./types";
import useWindowSize from "../../utils/use-window-size";

import {
    SCREEN_SMALL_WIDTH,
    SCREEN_SMALL_HEIGHT,
    SCREEN_MEDIUM_WIDTH,
    SCREEN_MEDIUM_HEIGHT,
    MIN_SIDESCREEN_WIDTH_FOR_JOURNAL,
    MIN_WIDTH_FOR_JOURNAL,
} from "../../constants";

export const reset = (): SystemActionType => {
    return {
        type: RESET,
    };
};

export const setLargeView = (to: boolean): SystemActionType => {
    return {
        type: SET_LARGE_VIEW,
        set: to,
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

export const setShowJournal = (to: boolean): SystemActionType => {
    return {
        type: SET_SHOW_JOURNAL,
        set: to,
    };
};

export const load = (data: LoadData): SystemActionType => {
    return { type: "LOAD", data };
};

const VIEWPORT_RESIZE_RATE = 250;

interface ViewportScale {
    largeView: boolean;
    sideMenu: boolean;
    journalSideMenu: boolean;
}

const updateViewportScale = (scale: ViewportScale): void => {
    store.dispatch(setSideMenu(scale.sideMenu));
    store.dispatch(setLargeView(scale.largeView));
    store.dispatch(setShowJournal(scale.journalSideMenu));
};

const _updateViewportScale = _debounce(updateViewportScale, VIEWPORT_RESIZE_RATE);

export const useViewportScaling = (): void => {
    const { height, width } = useWindowSize();

    useEffect(() => {
        let largeView = false;
        let sideMenu = false;
        let journalSideMenu = false;

        // if we have a wide screen size
        if (width > SCREEN_SMALL_WIDTH) {
            largeView = true;
            // if the screen size is too short
            if (height < SCREEN_MEDIUM_HEIGHT) sideMenu = true;
            if (height <= SCREEN_SMALL_HEIGHT) largeView = false;
        }

        // don't switch to side menu if there's no horizontal room
        if (width < SCREEN_MEDIUM_WIDTH) {
            sideMenu = false;
        }

        // if (!(isMobile || nativeApp)) {
        if (sideMenu) {
            if (width > MIN_SIDESCREEN_WIDTH_FOR_JOURNAL) journalSideMenu = true;
        } else {
            if (width > MIN_WIDTH_FOR_JOURNAL) journalSideMenu = true;
        }
        // }

        _updateViewportScale({ largeView, sideMenu, journalSideMenu });
    }, [height, width]);
};
