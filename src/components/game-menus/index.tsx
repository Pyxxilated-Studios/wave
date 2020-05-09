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
// import Journal from "../journal";

import "./styles.scss";

interface StateProps {
    system: SystemState;
    dialog: DialogState;
}

type GameMenusProps = StateProps;

const GameMenus: FunctionComponent<GameMenusProps> = (props: GameMenusProps) => {
    const { sideMenu, largeView } = props.system;
    const { paused, reason } = props.dialog;
    const { gameOver, gameStart, inventory, journalDialog, settings } = reason;

    // disable the inventory button when we are in settings or paused and not in the inventory
    const disableInventory = settings || (paused && !inventory && !journalDialog);
    // disable the stats view when in game start or game over or settings
    const disableStats = gameStart || gameOver || settings;

    return (
        <div className="flex-row centered">
            <div
                className={`game-menu-container ${sideMenu ? "flex-column" : "flex-row"}`}
                style={{
                    maxWidth: largeView ? 400 : 350,
                    paddingLeft: sideMenu ? 8 : 0,
                    top: sideMenu ? -11 : 0,
                    height: sideMenu ? "380px" : "unset",
                    justifyContent: disableInventory ? "flex-end" : "center",
                }}
            >
                <Stats largeView={largeView} sideMenu={sideMenu} disabled={disableStats || false} />

                <Inventory sideMenu={sideMenu} disabled={disableInventory} />
                {/* <Journal sideMenu={sideMenu} disabled={disableInventory} /> */}

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
