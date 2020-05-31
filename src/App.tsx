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

import { GAME_VIEWPORT_SIZE_LARGE } from "./constants";

import Viewport from "./components/viewport";
import World from "./components/world";
import DialogManager from "./components/dialog-manager";
import FloorCounter from "./components/floor-counter";
import GameMenus from "./components/game-menus";
import Journal from "./components/journal";
import SpellbookButton from "./components/on-screen-buttons/spellbook-button";
import AbilityButton from "./components/on-screen-buttons/ability-button";
import TutorialButton from "./components/on-screen-buttons/tutorial-button";

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

    const { sideMenu, journalSideMenu } = props.system;
    const { gameStart, gameOver, gameRunning } = props.dialog.reason;

    const disableJournal =
        gameStart || gameOver || !gameRunning || !journalSideMenu || !props.dialog.journalSideMenuOpen;

    if (sideMenu) {
        return (
            <>
                <div className={`centered flex-row`}>
                    <div
                        style={{
                            margin: "8px",
                            display: disableJournal ? "none" : "block",
                            width: GAME_VIEWPORT_SIZE_LARGE,
                            height: GAME_VIEWPORT_SIZE_LARGE,
                        }}
                    >
                        <Journal disabled={disableJournal} />
                    </div>
                    <div className={`centered ${sideMenu ? "flex-row" : "flex-column"}`}>
                        <div className={"centered flex-row"}>
                            <Viewport>
                                <World library={library} />
                                <DialogManager />
                                <TutorialButton />
                                <AbilityButton />
                                <SpellbookButton />

                                <FloorCounter floorNumber={props.world.floorNumber} />
                            </Viewport>
                        </div>

                        <GameMenus />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={`centered flex-row`}>
                <div
                    style={{
                        margin: "8px",
                        display: disableJournal ? "none" : "block",
                        width: GAME_VIEWPORT_SIZE_LARGE,
                        height: GAME_VIEWPORT_SIZE_LARGE,
                    }}
                >
                    <Journal disabled={disableJournal} />
                </div>
                <div
                    className={`centered ${sideMenu ? "flex-row" : "flex-column"}`}
                    style={{ marginRight: `${disableJournal ? "0" : GAME_VIEWPORT_SIZE_LARGE}px` }}
                >
                    <div className={"centered flex-row"}>
                        <Viewport>
                            <World library={library} />
                            <DialogManager />
                            <TutorialButton />
                            <AbilityButton />
                            <SpellbookButton />

                            <FloorCounter floorNumber={props.world.floorNumber} />
                        </Viewport>
                    </div>

                    <GameMenus />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState): AppProps => ({
    system: state.system,
    world: state.world,
    dialog: state.dialog,
});

export default connect(mapStateToProps)(App);
