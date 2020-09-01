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
    <div
        style={{
            position: "relative",
            height: "100%",
            width: "100%",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            margin: "0.25em 0.5em ",
        }}
    >
        <button
            className="game-settings-button white-border"
            onClick={props.toggleSettings}
            aria-label="Settings Button"
        >
            <FontAwesomeIcon icon="cog" className="game-settings-icon" />
        </button>
    </div>
);

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleSettings: (): void => dispatch(toggleSettings()),
});

export default connect(null, mapDispatchToProps)(GameSettings);
