import React, { FunctionComponent, ReactNode } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { DialogState } from "../../store/dialog/types";
import { SystemState } from "../../store/system/types";

import GameStartDialog from "./dialogs/game-start-dialog";
import ChestLoot from "./dialogs/chest-loot";
import InventoryDialog from "./dialogs/inventory-dialog";
import GameInstructions from "./dialogs/game-instructions";
import CharacterCreation from "./dialogs/character-creation";
import GameTextDialog from "./dialogs/game-text-dialog";
// import GameWin from './dialogs/game-win';
import GameOver from "./dialogs/game-over";
import SettingsDialog from "./dialogs/settings-dialog";
import ShopDialog from "./dialogs/shop-dialog";
import LevelUpDialog from "./dialogs/level-up-dialog";
import AbilityScores from "./dialogs/ability-dialog";
import JournalDialog from "./dialogs/journal-dialog";
import SpellbookDialog from "./dialogs/spellbook-dialog";
import TutorialDialog from "./dialogs/tutorial-dialog";

interface StateProps {
    dialog: DialogState;
    system: SystemState;
}

type DialogManagerProps = StateProps;

const DialogManager: FunctionComponent<DialogManagerProps> = (props: DialogManagerProps) => {
    const { character, paused, reason } = props.dialog;
    const {
        chest,
        inventory,
        gameText,
        gameOver,
        gameStart,
        //gameWin,
        gameInstructions,
        characterCreation,
        settings,
        shop,
        levelUp,
        abilityDialog,
        journalDialog,
        spellbookDialog,
        tutorialDialog,
    } = reason;

    let PauseComp: ReactNode = null;
    let SettingsComp: ReactNode = null;
    let LevelUpComp: ReactNode = null;

    if (paused) {
        if (chest) PauseComp = <ChestLoot />;
        if (shop) PauseComp = <ShopDialog />;
        if (inventory) PauseComp = <InventoryDialog />;
        if (journalDialog && !props.system.journalSideMenu) PauseComp = <JournalDialog />;
        if (spellbookDialog) PauseComp = <SpellbookDialog />;
        if (tutorialDialog) PauseComp = <TutorialDialog />;
        if (gameText)
            PauseComp = (
                <GameTextDialog
                    title={gameText.title.replace(/<>/g, character.name)}
                    body={gameText.body.replace(/<>/g, character.name)}
                />
            );
        if (abilityDialog) PauseComp = <AbilityScores />;
        if (characterCreation) PauseComp = <CharacterCreation />;
        if (gameInstructions) PauseComp = <GameInstructions />;
        if (gameOver) PauseComp = <GameOver />;
        if (gameStart) PauseComp = <GameStartDialog />;
        //     if (gameWin) PauseComp = <GameWin />;
    }
    if (settings) SettingsComp = <SettingsDialog />;
    if (levelUp) LevelUpComp = <LevelUpDialog />;

    return (
        <>
            {/* Show the 'paused' component here - this is the game start screen,
        game over screen, as well as other dialogs throughout the game */}
            {PauseComp}

            {LevelUpComp}

            {/* Show the 'settings' component over the 'paused' components */}
            {SettingsComp}
        </>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    dialog: state.dialog,
    system: state.system,
});

export default connect(mapStateToProps)(DialogManager);
