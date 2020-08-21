import React, { FunctionComponent, useState, forwardRef } from "react";
import ReactTimeout, { ReactTimeoutProps } from "react-timeout";
import { connect } from "react-redux";

import { RootDispatch, RootState } from "../../../../store";
import { DialogState } from "../../../../store/dialog/types";
import { reset } from "../../../../store/system/actions";

import Button from "../../../button";
import Dialog from "../../../dialog";

import { randomPhrase } from "./random-phrase";

import "./styles.scss";

interface DispatchProps {
    resetGameState: () => void;
}

interface StateProps {
    dialog: DialogState;
}

type GameOverProps = DispatchProps & StateProps & ReactTimeoutProps;

interface GameOverState {
    phrase: string;
    ready: boolean;
}

// Need to use forwardRef, as apparently setTimeout here uses a ref.
/* eslint-disable @typescript-eslint/no-unused-vars */
const GameOver: FunctionComponent<GameOverProps> = forwardRef((props: GameOverProps, _ref) => {
    const [state, setState] = useState<GameOverState>({ phrase: randomPhrase(), ready: false });

    props.setTimeout &&
        props.setTimeout(() => {
            setState({ ...state, ready: true });
        }, 1000);

    const { phrase, ready } = state;
    const { resetGameState, dialog } = props;

    const { entity, from } = dialog.diedFrom;

    const { name } = dialog.character;

    return (
        <Dialog
            keys={["Enter"]}
            onKeyPress={(): void => {
                if (ready) resetGameState();
            }}
        >
            <span className="game-over-title">{"Game Over!"}</span>

            <span className="game-over-text">{phrase}</span>

            <p className="game-over-text">
                Here lies the grave of{" "}
                <span className="game-over-player">{name.length <= 11 ? name : name.substr(0, 9) + "..."}</span>.{" "}
                {entity ? (
                    <>
                        They were slain by a mighty <span className="game-over-killer">{entity}</span>
                    </>
                ) : (
                    <>
                        <span className="game-over-killer">{from}</span> did them in.
                    </>
                )}
            </p>

            <div className="game-over-button">
                {ready ? (
                    <Button onClick={resetGameState} title="New Game" icon="sync" />
                ) : (
                    <Button title="New Game" icon="sync" />
                )}
            </div>
        </Dialog>
    );
});

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    resetGameState: (): void => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(GameOver));
