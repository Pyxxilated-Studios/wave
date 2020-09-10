import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootDispatch } from "../../../store";
import { toggleSettings } from "../../../store/dialog/actions";

import "./styles.scss";
import Button from "../../button";

interface DispatchProps {
    toggleSettings: () => void;
}

type GameSettingsProps = DispatchProps;

const GameSettings: FunctionComponent<GameSettingsProps> = (props: GameSettingsProps) => (
    <div className="settings-container">
        <Button icon="cog" onClick={props.toggleSettings} extraClass="game-settings-button" />
    </div>
);

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleSettings: (): void => dispatch(toggleSettings()),
});

export default connect(null, mapDispatchToProps)(GameSettings);
