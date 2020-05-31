import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootDispatch } from "../../../store";

import abilityScoreDialog from "../../dialog-manager/actions/ability-score-dialog";

import Button from "../../button";

import "./styles.scss";

interface DispatchProps {
    abilityScoreDialog: () => void;
}

type AbilityButtonProps = DispatchProps;

const AbilityButton: FunctionComponent<AbilityButtonProps> = (props: AbilityButtonProps) => {
    return (
        <div className="ability-button-container">
            <Button icon="angle-double-up" onClick={props.abilityScoreDialog} tiny />
        </div>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    abilityScoreDialog: (): void => dispatch(abilityScoreDialog(false)),
});

export default connect(null, mapDispatchToProps)(AbilityButton);
