import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../store";
import { SystemState } from "../../store/system/types";
import { DialogState } from "../../store/dialog/types";

import Button from "../button";

import toggleJournal from "../dialog-manager/actions/toggle-journal";

import "./styles.scss";

interface DispatchProps {
    toggleJournal: () => void;
}

interface StateProps {
    system: SystemState;
    dialog: DialogState;
}

interface OwnProps {
    disabled: boolean;
    sideMenu: boolean;
}

type JournalButtonProps = DispatchProps & StateProps & OwnProps;

const JournalButton: FunctionComponent<JournalButtonProps> = (props: JournalButtonProps) => {
    const open =
        props.dialog.reason.journalDialog ||
        ((props.system.journalSideMenu || props.system.journalLittleSideMenu) && props.dialog.journalSideMenuOpen);

    if (props.disabled) return null;

    return (
        <div className="flex-row journal-button-container">
            <Button
                onClick={props.toggleJournal}
                icon={"book"}
                iconRight={open ? "times" : undefined}
                title={open ? "Close" : "Journal"}
                style={{
                    width: 160,
                    transition: "width .25s ease-out",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    backgroundColor: "var(--dark-gray)",
                }}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ system: state.system, dialog: state.dialog });

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleJournal: (): void => dispatch(toggleJournal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalButton);
