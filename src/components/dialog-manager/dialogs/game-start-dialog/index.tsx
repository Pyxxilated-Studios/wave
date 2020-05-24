import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import startGame from "../../actions/start-game";

import Button from "../../../button";
import Dialog from "../../../dialog";
import Flame from "../../../flames";
// import loadGame from "../../actions/load-game";

import "./styles.scss";

interface DispatchProps {
    // loadGame: () => void;
    startGame: () => void;
}

type GameStartDialogProps = DispatchProps;

const GameStartDialog: FunctionComponent<GameStartDialogProps> = (props: GameStartDialogProps) => {
    return (
        <Dialog>
            <span className="flex-row game-start-title">{"Wave"}</span>

            <span className="flex-column game-start-text">
                {"Greetings, Traveler. Please, explore our dungeons..."}
            </span>

            <div className="game-start-flame-1">
                <Flame />
            </div>
            {/* <div className="game-start-flame-2">
                <Flame />
            </div>
            <div className="game-start-flame-3">
                <Flame />
            </div> */}

            <div className="flex-column game-start-button">
                <Button
                    style={{ marginBottom: 16 }}
                    onClick={props.startGame}
                    icon="play-circle"
                    title={"Start Game"}
                />

                {/* <Button
          onClick={() => {
            document.getElementById("load-game-dialog").click();
          }}
          icon="save"
          title={"Load Game"}
        />
        <input
          id={"load-game-dialog"}
          style={{ display: "none" }}
          type={"file"}
          onChange={(event) => {
            loadGame(event.target.files[0]);
          }}
        /> */}
            </div>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    // loadGame: (): void => ,
    startGame: (): void => dispatch(startGame()),
});

export default connect(null, mapDispatchToProps)(GameStartDialog);
