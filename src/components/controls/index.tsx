import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import { RootState } from "../../store";
import { DialogState } from "../../store/dialog/types";
import { PlayerState } from "../../store/player/types";
import { Direction } from "../../types";

import toggleInventory from "../dialog-manager/actions/toggle-inventory";
import move from "./actions/move-player";

import {
    LEFT_KEY,
    A_KEY,
    UP_KEY,
    W_KEY,
    RIGHT_KEY,
    D_KEY,
    DOWN_KEY,
    S_KEY,
    ANIMATION_SPEED,
    I_KEY,
} from "../../constants";

interface DispatchProps {
    movePlayer: (direction: Direction) => void;
    toggleInventory: () => void;
}

interface StateProps {
    player: PlayerState;
    dialog: DialogState;
}

type ControlProps = StateProps & DispatchProps;

const ANIMATION_WITH_PADDING = ANIMATION_SPEED * 1.25;

const Controls: React.FunctionComponent<ControlProps> = (props: ControlProps) => {
    const { dialog, movePlayer, toggleInventory } = props;

    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            event.preventDefault();
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
                case I_KEY:
                    return toggleInventory();
                default:
            }
        },
        [movePlayer, toggleInventory],
    );

    const _handleKeyPress = debounce(
        (event) => {
            // if the game is not paused by dialogs
            if (!dialog.paused) {
                handleKeyPress(event);
            }
        },
        ANIMATION_WITH_PADDING,
        { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false },
    );

    useEffect(() => {
        // Enable keyboard for player controls
        window.addEventListener("keydown", _handleKeyPress);

        return (): void => {
            window.removeEventListener("keydown", _handleKeyPress);
        };
    }, [_handleKeyPress]);

    return null;
};

const mapStateToProps = (state: RootState): StateProps => ({
    player: state.player,
    dialog: state.dialog,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    movePlayer: (direction: Direction): void => dispatch(move(direction)),
    toggleInventory: (): void => dispatch(toggleInventory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
