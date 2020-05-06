import React from "react";
import { connect } from "react-redux";

import Button from "../../../../components/button";
import Dialog from "../../../../components/dialog";
import closeDialog from "../../actions/close-dialog";

import "./styles.scss";

interface DispatchProps {
    closeDialog: () => void;
}

interface OwnProps {
    title: string;
    body: string;
}

type GameTextDialogProps = DispatchProps & OwnProps;

const GameTextDialog: React.FunctionComponent<GameTextDialogProps> = (props: GameTextDialogProps) => {
    return (
        <Dialog onKeyPress={props.closeDialog}>
            <div className="flex-column game-text-dialog-container">
                <span className="game-text-dialog-text">{props.title || ""}</span>

                <span className="game-text-dialog-text">{props.body || ""}</span>

                <div className="game-text-dialog-button">
                    <Button onClick={closeDialog} title="Continue" />
                </div>
            </div>
        </Dialog>
    );
};

const mapDispatchToState = (dispatch: any): DispatchProps => ({
    closeDialog: (): void => dispatch(closeDialog()),
});

export default connect(null, mapDispatchToState)(GameTextDialog);
