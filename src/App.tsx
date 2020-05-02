import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { RootState } from "./store";
import { SystemState } from "./store/system/types";
import { useViewportScaling } from "./store/system/actions";

import Viewport from "./components/viewport";
import World from "./components/world";
import Player from "./components/player";

interface AppProps {
  system: SystemState;
}

const App = (props: AppProps) => {
  const [library, setLibrary] = useState<typeof import("wave")>();
  useViewportScaling();

  // Disable scrolling of the page
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      disableBodyScroll(root);
    }

    return clearAllBodyScrollLocks;
  }, []);

  if (!library) {
    // If we don't do this here, we'd have to do it everywhere we want to
    // load the library. So, may as well do so here and pass it around.
    import("wave").then((module) => setLibrary(module));
    return null;
  }

  return (
    <div
      className={`centered ${
        props.system.sideMenu ? "flex-row" : "flex-column"
      }`}
    >
      <Viewport>
        <World library={library} />

        <Player />
      </Viewport>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system,
});

export default connect(mapStateToProps)(App);
