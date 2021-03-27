import { FunctionComponent } from "react";
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
    const { sideMenu } = props.system;
    const { paused, reason } = props.dialog;
    const { gameRunning, inventory, journalDialog, settings } = reason;

    const disableInventory = !gameRunning || settings || (paused && !inventory && !journalDialog);

    return (
        <>
            <div className="game-menu-container flex-row centered" style={{ zIndex: 100 }}>
                <Journal disabled={sideMenu} />

                <div className="flex-column centered">
                    <Stats sideMenu={sideMenu} />

                    <div className="flex-row" style={{ marginTop: "0.5em" }}>
                        <Inventory disabled={disableInventory} />

                        <JournalButton disabled={!sideMenu} />
                        <GameSettings />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ system: state.system, dialog: state.dialog });

export default connect(mapStateToProps)(GameMenus);
