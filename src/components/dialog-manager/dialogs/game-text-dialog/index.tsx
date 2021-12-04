import { FunctionComponent } from "react";
import { connect } from "react-redux";

import Button from "../../../button";
import Dialog from "../../../dialog";
import closeDialog from "../../actions/close-dialog";

import "./styles.scss";
import { RootDispatch } from "../../../../store";

interface DispatchProps {
    closeDialog: () => void;
}

interface OwnProps {
    title: string;
    body: string;
}

type GameTextDialogProps = DispatchProps & OwnProps;

const GameTextDialog: FunctionComponent<GameTextDialogProps> = (props: GameTextDialogProps) => {
    return (
        <Dialog onKeyPress={props.closeDialog}>
            <div className="flex-column game-text-dialog-container">
                <span className="game-text-dialog-text">{props.title || ""}</span>

                <span className="game-text-dialog-text">{props.body || ""}</span>

                <div className="game-text-dialog-button">
                    <Button onClick={props.closeDialog} title="Continue" />
                </div>
            </div>
        </Dialog>
    );
};

const mapDispatchToState = (dispatch: RootDispatch): DispatchProps => ({
    closeDialog: (): void => dispatch(closeDialog()),
});

export default connect(null, mapDispatchToState)(GameTextDialog);
