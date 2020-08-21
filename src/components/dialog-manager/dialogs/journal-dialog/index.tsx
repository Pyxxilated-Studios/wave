import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootDispatch } from "../../../../store";

import Dialog from "../../../dialog";
import Journal from "../../../journal";

import toggleJournal from "../../actions/toggle-journal";

import "./styles.scss";

interface DispatchProps {
    toggleJournal: () => void;
}

type JournalDialogProps = DispatchProps;

const JournalDialog: FunctionComponent<JournalDialogProps> = (props: JournalDialogProps) => {
    return (
        <Dialog keys={["J", "j", "Escape", "Esc"]} onKeyPress={(): void => props.toggleJournal()}>
            <Journal disabled={false} />
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleJournal: (): void => dispatch(toggleJournal()),
});

export default connect(null, mapDispatchToProps)(JournalDialog);
