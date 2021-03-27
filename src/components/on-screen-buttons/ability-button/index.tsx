import { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootDispatch, RootState } from "../../../store";
import { SystemState } from "../../../store/system/types";

import abilityScoreDialog from "../../dialog-manager/actions/ability-score-dialog";

import Button from "../../button";

import "./styles.scss";

interface DispatchProps {
    abilityScoreDialog: () => void;
}

interface StateProps {
    system: SystemState;
}

type AbilityButtonProps = DispatchProps & StateProps;

const AbilityButton: FunctionComponent<AbilityButtonProps> = (props: AbilityButtonProps) => {
    return (
        <div className="ability-button-container">
            <Button
                indicator={props.system.abilityScoreIndicator}
                icon="angle-double-up"
                onClick={props.abilityScoreDialog}
                tiny
                label="Ability Button"
                style={{ transition: "width .25s ease-out" }}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ system: state.system });

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    abilityScoreDialog: (): void => dispatch(abilityScoreDialog(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AbilityButton);
