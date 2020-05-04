import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store';
import { DialogState } from '../../store/dialog/types';
import { PlayerState } from '../../store/player/types';
import { Direction } from '../../types';

import move from './actions/move-player';

import { LEFT_KEY, A_KEY, UP_KEY, W_KEY, RIGHT_KEY, D_KEY, DOWN_KEY, S_KEY } from '../../constants';

interface DispatchProps {
    movePlayer: (direction: Direction) => void;
}

interface StateProps {
    player: PlayerState;
    dialog: DialogState;
}

type ControlProps = StateProps & DispatchProps;

const Controls = (props: ControlProps) => {
    const { dialog, movePlayer } = props;

    const handleKeyPress = useCallback(
        (event: KeyboardEvent): any => {
            event.preventDefault();
            if (!dialog.paused) {
                switch (event.keyCode) {
                    case UP_KEY:
                    case W_KEY:
                        return movePlayer(Direction.North);
                    case DOWN_KEY:
                    case S_KEY:
                        return movePlayer(Direction.South);
                    case RIGHT_KEY:
                    case D_KEY:
                        return movePlayer(Direction.East);
                    case LEFT_KEY:
                    case A_KEY:
                        return movePlayer(Direction.West);
                    default:
                }
            }
        },
        [dialog.paused, movePlayer],
    );

    useEffect(() => {
        // Enable keyboard for player controls
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return null;
};

const mapStateToProps = (state: RootState) => ({
    player: state.player,
    dialog: state.dialog,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    movePlayer: (direction: Direction) => dispatch(move(direction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
