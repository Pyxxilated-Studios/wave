import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../button';
import Dialog from '../../../dialog';
// import Flame from "../../../../components/flame";
// import loadGame from "../../actions/load-game";

import './styles.scss';

interface GameStartDialogProps {
    gameDialog?: any;
    loadGame?: any;
}

const GameStartDialog = ({ gameDialog, loadGame }: GameStartDialogProps) => {
    return (
        <Dialog>
            <span className="flex-row game-start-title">{'Roll For Reaction'}</span>

            <span className="flex-column game-start-text">
                {'Greetings, Traveler. Please, explore our dungeons...'}
            </span>

            {/* <div className="game-select__flame--1">
        <Flame />
      </div>
      <div className="game-select__flame--2">
        <Flame />
      </div>
      <div className="game-select__flame--3">
        <Flame />
      </div> */}

            <div className="flex-column game-start-button">
                <Button style={{ marginBottom: 16 }} onClick={gameDialog} icon="torah" title={'Start Game'} />

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

// const actions = { gameDialog, loadGame };

export default connect()(GameStartDialog);
