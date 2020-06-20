import React, { Component, ReactNode } from "react";
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

class JournalSide extends Component<JournalProps> {
    scrollToBottom = (): void => {
        console.log("Called");
        const journal = document.getElementById("journal");
        if (journal) {
            console.log(journal);
            journal.scrollTop = journal.scrollHeight;
        }
    };

    componentDidMount(): void {
        this.scrollToBottom();
    }

    componentDidUpdate(): void {
        this.scrollToBottom();
    }

    render(): ReactNode {
        const { disabled, journal } = this.props;

        return (
            <div
                className="journal-container white-border"
                style={{
                    visibility: disabled ? "hidden" : "visible",
                }}
            >
                <div className="flex-column journal-dialog-container" id="journal">
                    {journal.entries.map((entry) =>
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
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    journal: state.journal,
});

export default connect(mapStateToProps)(JournalSide);
