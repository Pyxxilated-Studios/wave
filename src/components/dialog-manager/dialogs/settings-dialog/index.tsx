import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { ENTER_KEY, ESC_KEY } from "../../../../constants";
import { closeSettings } from "../../../../store/dialog/actions";
import resetGameState from "../../../world/actions/reset-game";

import Button from "../../../button";
import ConfirmDialog from "../../../confirm-dialog";
import Dialog from "../../../dialog";

import "./styles.scss";

interface DispatchProps {
    resetGameState: () => void;
    closeSettings: () => void;
}

interface StateProps {
    state: RootState;
}

type SettingsDialogProps = DispatchProps & StateProps;

const SettingsDialog: FunctionComponent<SettingsDialogProps> = (props: SettingsDialogProps) => {
    const [confirmQuit, setConfirmQuit] = useState(false);

    const saveGame = (): void => {
        const blob = new Blob([JSON.stringify(props.state)]);
        const filename = props.state.dialog.character.name + ".json";

        if (window.navigator.msSaveBlob) {
            // Internet Explorer/Edge
            window.navigator.msSaveBlob(blob, filename);
        } else {
            // Chrome/Firefox
            const save = document.getElementById("save-game-dialog") as HTMLAnchorElement;
            const url = window.URL.createObjectURL(blob);
            if (save) {
                save.href = url;
                save.download = filename;
                save.click();
                window.URL.revokeObjectURL(url);
            }
        }
    };

    const playerCreated = props.state.dialog.character.name.length > 0;

    return (
        <Dialog
            keys={[ENTER_KEY, ESC_KEY]}
            onKeyPress={(key): void => {
                if (key === ENTER_KEY) {
                    setConfirmQuit(true);
                } else {
                    props.closeSettings();
                }
            }}
        >
            <div className="flex-column settings-dialog-container">
                <span className="settings-dialog-title">{"Settings"}</span>

                <Button onClick={(): void => setConfirmQuit(true)} icon="caret-square-left" title="Return to Menu" />

                {playerCreated && (
                    <>
                        <Button onClick={saveGame} icon="save" title="Save Game" />
                        <a href="#save" id="save-game-dialog" style={{ display: "none" }}>
                            Save
                        </a>
                    </>
                )}

                <Button onClick={props.closeSettings} icon="times" title="Close" />
            </div>

            <ConfirmDialog
                open={confirmQuit}
                text="Are you sure you want to quit? You will lose all progress..."
                onClose={(): void => setConfirmQuit(false)}
                acceptKeys
                confirm={props.resetGameState}
                acceptIcon="check"
                acceptText="Yes"
                cancelIcon="times"
                cancelText="No"
            />
        </Dialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    state,
});
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    resetGameState: (): void => dispatch(resetGameState()),
    closeSettings: (): void => dispatch(closeSettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
