import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { toggleSettings } from "../../../store/dialog/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    toggleSettings: (): void => dispatch(toggleSettings()),
});

export default connect(null, mapDispatchToProps)(GameSettings);
