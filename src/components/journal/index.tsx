import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { JournalState } from "../../store/journal/types";

import "../dialog-manager/dialogs/journal-dialog/entry-styles.scss";
import "./styles.scss";

interface StateProps {
    journal: JournalState;
}

interface OwnProps {
    disabled: boolean;
}

type JournalProps = StateProps & OwnProps;

const Journal: FunctionComponent<JournalProps> = (props: JournalProps) => {
    useEffect(() => {
        const journal = document.getElementById("journal");
        if (journal) {
            journal.scrollTop = journal.scrollHeight;
        }
    }, [props.disabled, props.journal]);

    if (props.disabled) return null;

    return (
        <div className="journal-container white-border" id="journal">
            <div className="flex-column journal-dialog-container">
                {props.journal.entries.map((entry) => (
                    <div key={entry.key} className="journal-entry flex-row">
                        {entry.entry}
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    journal: state.journal,
});

export default connect(mapStateToProps)(Journal);
