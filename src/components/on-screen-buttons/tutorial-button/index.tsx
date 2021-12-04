import { FunctionComponent } from "react";
import { connect } from "react-redux";

import Button from "../../button";
import toggleTutorial from "../../dialog-manager/actions/toggle-tutorial";

import "./styles.scss";
import { RootDispatch } from "../../../store";

interface DispatchProps {
    toggleTutorial: () => void;
}

type TutorialButtonProps = DispatchProps;

const TutorialButton: FunctionComponent<TutorialButtonProps> = (props: TutorialButtonProps) => {
    return (
        <div className={"tutorial-container"}>
            <Button icon="question-circle" onClick={props.toggleTutorial} tiny label="Tutorial Button"></Button>
        </div>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleTutorial: (): void => dispatch(toggleTutorial()),
});

export default connect(null, mapDispatchToProps)(TutorialButton);
