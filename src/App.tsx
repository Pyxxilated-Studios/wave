import { useState, useEffect, FunctionComponent } from "react";
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
    faCoins,
    faWalking,
    faAngleDoubleRight,
    faArrowRight,
    faSync,
    faBook,
    faBookOpen,
    faAngleDoubleUp,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import { RootState } from "./store";
import { SystemState } from "./store/system/types";
import { useViewportScaling } from "./store/system/actions";
import { WorldState } from "./store/world/types";
import { DialogState } from "./store/dialog/types";

import AbilityButton from "./components/on-screen-buttons/ability-button";
import DialogManager from "./components/dialog-manager";
import FloorCounter from "./components/floor-counter";
import GameMenus from "./components/game-menus";
import Snackbar from "./components/snackbar";
import SpellbookButton from "./components/on-screen-buttons/spellbook-button";
import TutorialButton from "./components/on-screen-buttons/tutorial-button";
import Viewport from "./components/viewport";
import World from "./components/world";

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
    faCoins,
    faWalking,
    faAngleDoubleRight,
    faArrowRight,
    faSync,
    faBook,
    faBookOpen,
    faAngleDoubleUp,
    faQuestionCircle,
);

interface AppProps {
    system: SystemState;
    world: WorldState;
    dialog: DialogState;
}

const App: FunctionComponent<AppProps> = (props: AppProps) => {
    const [library, setLibrary] = useState<typeof import("wave")>();
    useViewportScaling();

    // Disable scrolling of the page
    useEffect(() => {
        const root = document.getElementById("root");
        if (root) {
            disableBodyScroll(root, {
                allowTouchMove: (el: Element | HTMLElement | null) => {
                    while (el && el !== document.body) {
                        if (el.getAttribute && el.getAttribute("disable-scroll-lock")) {
                            return true;
                        }

                        el = el.parentNode as typeof el;
                    }
                },
            });
        }

        return clearAllBodyScrollLocks;
    }, []);

    if (!library) {
        // If we don't do this here, we'd have to do it everywhere we want to
        // load the library. So, may as well do so here and pass it around.
	import("wave").then(setLibrary);
        return null;
    }

    return (
        <>
            <Viewport>
                <World library={library} />
                <FloorCounter floorNumber={props.world.floorNumber} />
                <DialogManager />
                <TutorialButton />
                <AbilityButton />
                <SpellbookButton />
                <Snackbar />
            </Viewport>

            <GameMenus />
        </>
    );
};

const mapStateToProps = (state: RootState): AppProps => ({
    system: state.system,
    world: state.world,
    dialog: state.dialog,
});

export default connect(mapStateToProps)(App);
