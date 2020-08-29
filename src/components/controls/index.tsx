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
import { castSpell } from "../player/actions/player-cast-spell";

import toggleInventory from "../dialog-manager/actions/toggle-inventory";
import abilityScoreDialog from "../dialog-manager/actions/ability-score-dialog";

import { ANIMATION_SPEED } from "../../constants";
import toggleJournal from "../dialog-manager/actions/toggle-journal";
import toggleSpellbookDialog from "../dialog-manager/actions/toggle-spellbook-dialog";
import toggleTutorial from "../dialog-manager/actions/toggle-tutorial";

interface DispatchProps {
    movePlayer: (direction: Direction) => void;
    toggleInventory: () => void;
    toggleSettings: () => void;
    openAbilityScoreDialog: () => void;
    playerAttack: () => void;
    toggleJournal: () => void;
    toggleSpellbookDialog: () => void;
    playerCastSpell: () => void;
    toggleTutorial: () => void;
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
        toggleTutorial,
        openAbilityScoreDialog,
        playerAttack,
        playerCastSpell,
        toggleSpellbookDialog,
    } = props;

    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            event.preventDefault();
            switch (event.key) {
                case "Escape":
                case "Esc":
                    return toggleSettings();
                case "Up": // IE/Edge specific value
                case "ArrowUp":
                case "W":
                case "w":
                    return movePlayer(Direction.North);
                case "Down": // IE/Edge specific value
                case "ArrowDown":
                case "S":
                case "s":
                    return movePlayer(Direction.South);
                case "Right": // IE/Edge specific value
                case "ArrowRight":
                case "D":
                case "d":
                    return movePlayer(Direction.East);
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                case "A":
                case "a":
                    return movePlayer(Direction.West);
                case "I":
                case "i":
                    return toggleInventory();
                case "J":
                case "j":
                    return toggleJournal();
                case "B":
                case "b":
                    return toggleSpellbookDialog();
                case "U":
                case "u":
                    return openAbilityScoreDialog();
                case "H":
                case "h":
                    return toggleTutorial();
                case "C":
                case "c":
                    return playerCastSpell();
                case " ":
                    return playerAttack();
                default:
                    break;
            }
        },
        [
            movePlayer,
            toggleInventory,
            toggleSettings,
            toggleJournal,
            toggleTutorial,
            toggleSpellbookDialog,
            openAbilityScoreDialog,
            playerAttack,
            playerCastSpell,
        ],
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
    openAbilityScoreDialog: (): void => dispatch(abilityScoreDialog(true)),
    playerAttack: (): void => dispatch(playerAttack()),
    toggleJournal: (): void => dispatch(toggleJournal()),
    toggleSpellbookDialog: (): void => dispatch(toggleSpellbookDialog()),
    playerCastSpell: (): void => dispatch(castSpell()),
    toggleTutorial: (): void => dispatch(toggleTutorial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
