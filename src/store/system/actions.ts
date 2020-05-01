import { useEffect } from "react";
import _debounce from "lodash.debounce";

import { SystemTypes, SET_LARGE_VIEW, SET_SIDE_MENU } from "./types";
import useWindowSize from "../../utils/use-window-size";

import {
  SCREEN_SMALL_WIDTH,
  SCREEN_SMALL_HEIGHT,
  SCREEN_MEDIUM_WIDTH,
  SCREEN_MEDIUM_HEIGHT,
} from "../../constants";

export const setLargeView = (to: boolean): SystemTypes => {
  return {
    type: SET_LARGE_VIEW,
    set: to,
  };
};

export const setSideMenu = (to: boolean): SystemTypes => {
  return {
    type: SET_SIDE_MENU,
    set: to,
  };
};

const VIEWPORT_RESIZE_RATE = 250;

interface ViewportScale {
  largeView: boolean;
  sideMenu: boolean;
}

export const useViewportScaling = () => {
  const { height, width } = useWindowSize();

  const updateViewportScale = (scale: ViewportScale) => {
    setSideMenu(scale.sideMenu);
    setLargeView(scale.largeView);
  };

  const _updateViewportScale = _debounce(
    updateViewportScale,
    VIEWPORT_RESIZE_RATE
  );

  useEffect(() => {
    let largeView = false;
    let sideMenu = false;
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

    _updateViewportScale({ largeView, sideMenu });
  }, [height, width, _updateViewportScale]);
};
