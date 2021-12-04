import { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootDispatch } from "../../../../store";

import startGame from "../../actions/start-game";
import loadGame from "../../actions/load-game";
import toggleTutorial from "../../actions/toggle-tutorial";

import Button from "../../../button";
import Dialog from "../../../dialog";
import Flame from "../../../flames";

import "./styles.scss";

interface DispatchProps {
    loadGame: (file: File) => void;
    startGame: () => void;
    toggleTutorial: () => void;
}

type GameStartDialogProps = DispatchProps;

const GameStartDialog: FunctionComponent<GameStartDialogProps> = (props: GameStartDialogProps) => {
    return (
        <Dialog>
            <span className="flex-row game-start-title">{"Wave"}</span>

            <span className="flex-column game-start-text">{"Greetings, Traveler. Please, explore our dungeon..."}</span>

            <div className="game-start-flame-1">
                <Flame />
            </div>
            <div className="game-start-flame-2">
                <Flame />
            </div>
            <div className="game-start-flame-3">
                <Flame />
            </div>

            <div className="flex-column game-start-button">
                <Button style={{ marginBottom: 16 }} onClick={props.startGame} icon="play-circle" title="Start Game" />

                <Button
                    style={{ marginBottom: 16 }}
                    onClick={props.toggleTutorial}
                    icon="question-circle"
                    title="How to Play"
                />

                <Button
                    onClick={(): void => {
                        document.getElementById("load-game-dialog")?.click();
                    }}
                    icon="save"
                    title="Load Game"
                />
                <input
                    id={"load-game-dialog"}
                    style={{ display: "none" }}
                    type={"file"}
                    onChange={(event): void => {
                        if (event.target.files) {
                            props.loadGame(event.target.files[0]);
                        }
                    }}
                />
            </div>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    loadGame: (file: File): void => dispatch(loadGame(file)),
    startGame: (): void => dispatch(startGame()),
    toggleTutorial: (): void => dispatch(toggleTutorial()),
});

export default connect(null, mapDispatchToProps)(GameStartDialog);
