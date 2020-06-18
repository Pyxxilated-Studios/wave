import React, { useEffect, FunctionComponent, useRef } from "react";
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
    const journalBottom = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        journalBottom.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [props.journal]);

    return (
        <div
            className="journal-container white-border"
            style={{
                visibility: props.disabled ? "hidden" : "visible",
            }}
        >
            <div className="flex-column journal-dialog-container">
                {props.journal.entries.map((entry) =>
                    entry ? (
                        <div key={entry.key} className="journal-entry flex-row">
                            {entry.entry}
                        </div>
                    ) : (
                        <div></div>
                    ),
                )}
                <div ref={journalBottom}></div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    journal: state.journal,
});

export default connect(mapStateToProps)(JournalSide);
