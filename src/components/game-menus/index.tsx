import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { SystemState } from "../../store/system/types";
import { DialogState } from "../../store/dialog/types";

import GameSettings from "./settings";
import Inventory from "../inventory";
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
        <>
            <div className="game-menu-container flex-row centered" style={{ zIndex: 100 }}>
                <Journal disabled={sideMenu} />

                <div className="flex-column centered">
                    <Stats largeView={largeView} sideMenu={sideMenu} disabled={disableStats || false} />

                    <div className="flex-row" style={{ marginTop: "0.5em" }}>
                        <Inventory disabled={disableInventory} />

                        {/* <JournalButton disabled={disableInventory} /> */}
                        <GameSettings />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ system: state.system, dialog: state.dialog });

export default connect(mapStateToProps)(GameMenus);
