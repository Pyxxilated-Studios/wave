import React from "react";
import { connect } from "react-redux";
import { DialogState } from "../../store/dialog/types";
import { RootState } from "../../store";
import GameStartDialog from "./dialogs/game-start-dialog";

// import ChestLoot from './dialogs/chest-loot';
// import EndlessGameStart from './dialogs/endless-game-start';
// import InventoryDialog from './dialogs/inventory-dialog';
// import GameInstructions from './dialogs/game-instructions';
import CharacterCreation from "./dialogs/character-creation";
// import GameTextDialog from './dialogs/game-text-dialog';
// import GameSelect from './dialogs/game-select';
// import GameWin from './dialogs/game-win';
// import GameOver from './dialogs/game-over';
// import MainGameStart from './dialogs/main-game-start';
// import SettingsDialog from './dialogs/settings-dialog';
// import ShopDialog from './dialogs/shop-dialog';
// import LevelUp from './dialogs/level-up';
import AbilityScores from "./dialogs/ability-dialog";
// import CharacterCustomisation from './dialogs/character-customisation';
// import JournalDialog from './dialogs/journal-dialog';
// import SpellbookDialog from './dialogs/spellbook-dialog';

interface DialogProps {
    dialog: DialogState;
    journal: boolean;
}

const DialogManager = (props: DialogProps) => {
    const { character, paused, reason } = props.dialog;
    const {
        chest,
        inventory,
        gameText,
        gameOver,
        gameStart,
        gameWin,
        gameInstructions,
        characterCreation,
        settings,
        shop,
        levelUp,
        abilityDialog,
        journalDialog,
        spellbookDialog,
    } = reason;

    let PauseComp: React.ReactElement | null = null;
    const SettingsComp: React.ReactElement | null = null;
    const LevelUpComp: React.ReactElement | null = null;

    if (paused) {
        //     if (chest) PauseComp = <ChestLoot />;
        //     if (shop) PauseComp = <ShopDialog />;
        //     if (inventory) PauseComp = <InventoryDialog />;
        //     if (journalDialog) PauseComp = <JournalDialog entries={journal.entries} />;
        //     if (spellbookDialog) PauseComp = <SpellbookDialog />;
        //     if (gameText)
        //       PauseComp = (
        //         <GameTextDialog
        //           text1={gameText.title.replace(/<>/g, character.characterName)}
        //           text2={gameText.body.replace(/<>/g, character.characterName)}
        //         />
        //       );
        if (abilityDialog) PauseComp = <AbilityScores />;
        if (characterCreation) PauseComp = <CharacterCreation />;
        //     if (gameInstructions) PauseComp = <GameInstructions />;
        //     if (gameOver) PauseComp = <GameOver />;
        if (gameStart) PauseComp = <GameStartDialog />;
        //     if (gameWin) PauseComp = <GameWin />;
    }
    //   if (settings) SettingsComp = <SettingsDialog />;
    //   if (levelUp) LevelUpComp = <LevelUp />;

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

const mapStateToProps = (state: RootState) => ({
    dialog: state.dialog,
    journal: false,
});

export default connect(mapStateToProps)(DialogManager);
