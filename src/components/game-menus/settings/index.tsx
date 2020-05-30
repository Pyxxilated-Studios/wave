import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RootDispatch } from "../../../store";
import { toggleSettings } from "../../../store/dialog/actions";

import "./styles.scss";

interface DispatchProps {
    toggleSettings: () => void;
}

type GameSettingsProps = DispatchProps;

const GameSettings: FunctionComponent<GameSettingsProps> = (props: GameSettingsProps) => (
    <button className="game-settings-button white-border" onClick={props.toggleSettings}>
        <FontAwesomeIcon icon="cog" className="game-settings-icon" />
    </button>
);

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleSettings: (): void => dispatch(toggleSettings()),
});

export default connect(null, mapDispatchToProps)(GameSettings);
