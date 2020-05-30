import { useEffect, useCallback, FunctionComponent } from "react";
import { connect } from "react-redux";
import debounce from "lodash.debounce";

import { RootState, RootDispatch } from "../../store";
import { DialogState } from "../../store/dialog/types";
import { PlayerState } from "../../store/player/types";
import { Direction } from "../../types";

import { toggleSettings } from "../../store/dialog/actions";

import move from "./actions/move-player";
import playerAttack from "../player/actions/player-attack";

import toggleInventory from "../dialog-manager/actions/toggle-inventory";
import abilityScoreDialog from "../dialog-manager/actions/ability-score-dialog";

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
    ESC_KEY,
    U_KEY,
    SPACE_KEY,
    J_KEY,
} from "../../constants";
import toggleJournal from "../dialog-manager/actions/toggle-journal";

interface DispatchProps {
    movePlayer: (direction: Direction) => void;
    toggleInventory: () => void;
    toggleSettings: () => void;
    openAbilityScoreDialog: () => void;
    playerAttack: () => void;
    toggleJournal: () => void;
}

interface StateProps {
    player: PlayerState;
    dialog: DialogState;
}

type ControlProps = StateProps & DispatchProps;

const ANIMATION_WITH_PADDING = ANIMATION_SPEED * 1.25;

const Controls: FunctionComponent<ControlProps> = (props: ControlProps) => {
    const {
        dialog,
        movePlayer,
        toggleInventory,
        toggleSettings,
        toggleJournal,
        openAbilityScoreDialog,
        playerAttack,
    } = props;

    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            event.preventDefault();
            switch (event.keyCode) {
                case ESC_KEY:
                    return toggleSettings();
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
                case J_KEY:
                    return toggleJournal();
                case U_KEY:
                    return openAbilityScoreDialog();
                case SPACE_KEY:
                    return playerAttack();
                default:
            }
        },
        [movePlayer, toggleInventory, toggleSettings, toggleJournal, openAbilityScoreDialog, playerAttack],
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

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    movePlayer: (direction: Direction): void => dispatch(move(direction)),
    toggleInventory: (): void => dispatch(toggleInventory()),
    toggleSettings: (): void => dispatch(toggleSettings()),
    openAbilityScoreDialog: (): void => dispatch(abilityScoreDialog(false)),
    playerAttack: (): void => dispatch(playerAttack()),
    toggleJournal: (): void => dispatch(toggleJournal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
