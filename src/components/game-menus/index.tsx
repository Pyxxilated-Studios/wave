import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { SystemState } from "../../store/system/types";
import { DialogState } from "../../store/dialog/types";

// import GameMusic from "./game-music";
import GameSettings from "./settings";
import Inventory from "../inventory";
import Snackbar from "../snackbar";
import Stats from "../stats";
import Journal from "../journal";
import JournalButton from "../journal/button";

import "./styles.scss";

interface StateProps {
    system: SystemState;
    dialog: DialogState;
}

type GameMenusProps = StateProps;

const GameMenus: FunctionComponent<GameMenusProps> = (props: GameMenusProps) => {
    const { sideMenu, largeView, journalLittleSideMenu } = props.system;
    const { paused, reason } = props.dialog;
    const { gameOver, gameStart, gameRunning, inventory, journalDialog, settings } = reason;

    const disableInventory = !gameRunning || settings || (paused && !inventory && !journalDialog);
    // disable the stats view when in game start or game over or settings
    const disableStats = !gameRunning || gameStart || gameOver || settings;

    const disableJournal =
        !gameRunning || gameStart || gameOver || !journalLittleSideMenu || !props.dialog.journalSideMenuOpen;

    return (
        <div className="flex-row centered">
            <div
                className="game-menu-container flex-row"
                style={{
                    maxWidth: largeView ? 400 : 350,
                    width: largeView ? 400 : 350,
                    top: 0,
                    justifyContent: disableInventory ? "flex-end" : "center",
                    padding: sideMenu ? "8px 0 0 8px" : 0,
                }}
            >
                {sideMenu && (
                    <div className="flex-row journal-side-menu" style={{ width: "100%" }}>
                        <Journal disabled={disableJournal} />
                    </div>
                )}

                <Stats largeView={largeView} sideMenu={sideMenu} disabled={disableStats || false} />

                <Inventory sideMenu={sideMenu} disabled={disableInventory} />
                <JournalButton sideMenu={sideMenu} disabled={disableInventory} />

                <Snackbar largeView={largeView} sideMenu={sideMenu} />

                <div className="flex-column">
                    {/* <GameMusic sideMenu={sideMenu} /> */}
                    <GameSettings />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ system: state.system, dialog: state.dialog });

export default connect(mapStateToProps)(GameMenus);
