import React, { useState, useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {
    faPlayCircle,
    faArrowLeft,
    faCaretLeft,
    faCaretRight,
    faTimes,
    faBriefcase,
    faHandPaper,
    faCheck,
    faTrash,
    faArchive,
    faCog,
    faCaretSquareLeft,
    faSave,
} from "@fortawesome/free-solid-svg-icons";

import { RootState } from "./store";
import { SystemState } from "./store/system/types";
import { useViewportScaling } from "./store/system/actions";
import { WorldState } from "./store/world/types";

import Viewport from "./components/viewport";
import World from "./components/world";
import DialogManager from "./components/dialog-manager";
import FloorCounter from "./components/floor-counter";
import GameMenus from "./components/game-menus";

fontawesome.library.add(
    faPlayCircle,
    faArrowLeft,
    faCaretLeft,
    faCaretRight,
    faTimes,
    faBriefcase,
    faHandPaper,
    faCheck,
    faTrash,
    faArchive,
    faCog,
    faCaretSquareLeft,
    faSave,
);

interface AppProps {
    system: SystemState;
    world: WorldState;
}

const App: FunctionComponent<AppProps> = (props: AppProps) => {
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
        <div className={`centered ${props.system.sideMenu ? "flex-row" : "flex-column"}`}>
            <Viewport>
                <World library={library} />
                <DialogManager />
                <FloorCounter floorNumber={props.world.floorNumber} />
            </Viewport>

            <GameMenus />
        </div>
    );
};

const mapStateToProps = (state: RootState): AppProps => ({
    system: state.system,
    world: state.world,
});

export default connect(mapStateToProps)(App);
