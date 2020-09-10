import React, { FunctionComponent, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { JournalState } from "../../store/journal/types";
import { SystemState } from "../../store/system/types";

import "./styles.scss";

interface StateProps {
    journal: JournalState;
    system: SystemState;
}

interface OwnProps {
    disabled: boolean;
}

type JournalProps = StateProps & OwnProps;

const Journal: FunctionComponent<JournalProps> = (props: JournalProps) => {
    const journalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const journal = journalRef.current;
        if (journal) {
            journal.scrollTop = journal.scrollHeight;
        }
    }, [props.journal]);

    if (props.disabled) return null;

    return (
        <div
            className="journal-container white-border"
            ref={journalRef}
            style={props.system.sideMenu ? {} : { marginRight: "0.5em", minHeight: "13em", maxHeight: "13em" }}
        >
            <div className="flex-column">
                {props.journal.entries.map((entry) => (
                    <div key={entry.key} className="journal-entry">
                        {entry.entry}
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    journal: state.journal,
    system: state.system,
});

export default connect(mapStateToProps)(Journal);
