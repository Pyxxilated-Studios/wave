import React, { useEffect, FunctionComponent } from "react";
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

const JournalSide: FunctionComponent<JournalProps> = (props: JournalProps) => {
    useEffect(() => {
        const journal = document.getElementById("journal-side");
        if (journal !== null) {
            // Automatically scroll the journal when new content is added
            journal.scrollTop = journal.scrollHeight;
        }
    }, [props.journal]);

    return (
        <div
            className="journal-container white-border"
            style={{
                visibility: props.disabled ? "hidden" : "visible",
            }}
        >
            <div
                className="flex-column journal-dialog-container"
                id="journal-side"
                style={{
                    scrollBehavior: "smooth",
                }}
            >
                {props.journal.entries.map((entry) =>
                    entry ? (
                        <div key={entry.key} className="journal-entry flex-row">
                            {entry.entry}
                        </div>
                    ) : (
                        <div></div>
                    ),
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    journal: state.journal,
});

export default connect(mapStateToProps)(JournalSide);
