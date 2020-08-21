import React, { FunctionComponent, ReactNode } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { DialogState } from "../../../../store/dialog/types";
import { changeTutorialPage } from "../../../../store/dialog/actions";

import Button from "../../../button";
import MicroDialog from "../../../micro-dialog";

import AbilityTutorial from "./pages/ability-tutorial";
import SpellTutorial from "./pages/spell-tutorial";
import MovementTutorial from "./pages/movement-tutorial";
import CombatTutorial from "./pages/combat-tutorial";
import ItemTutorial from "./pages/item-tutorial";
import ShopTutorial from "./pages/shop-tutorial";
import DicePage from "./pages/dice-page";
import HotkeyPage from "./pages/hotkey-page";

import getNextPage from "./actions/get-next-page";
import getPreviousPage from "./actions/get-previous-page";
import toggleTutorial from "../../actions/toggle-tutorial";

import "./styles.scss";

interface DispatchProps {
    toggleTutorial: () => void;
    changeTutorialPage: (page?: string) => void;
}

interface StateProps {
    dialog: DialogState;
}

type TutorialDialogProps = DispatchProps & StateProps;

const TutorialDialog: FunctionComponent<TutorialDialogProps> = (props: TutorialDialogProps) => {
    const getTutorialPage = (page?: string): ReactNode => {
        switch (page) {
            case "movement":
                return <MovementTutorial />;
            case "combat":
                return <CombatTutorial />;
            case "spell":
                return <SpellTutorial />;
            case "ability":
                return <AbilityTutorial />;
            case "item":
                return <ItemTutorial />;
            case "shop":
                return <ShopTutorial />;
            case "dice":
                return <DicePage />;
            case "hotkey":
                return <HotkeyPage />;
            default:
                return null;
        }
    };

    const prevPage = getPreviousPage(props.dialog.reason.tutorialPage);
    const nextPage = getNextPage(props.dialog.reason.tutorialPage);

    return (
        <MicroDialog
            keys={["H", "h"]}
            onClose={props.toggleTutorial}
            onKeyPress={(): void => props.changeTutorialPage(nextPage)}
            fullsize
            className="centered"
        >
            {getTutorialPage(props.dialog.reason.tutorialPage)}
            <div className="flex-row tutorial-navigation">
                {prevPage && (
                    <div className="centered tutorial-button-prev">
                        <Button
                            onClick={(): void => props.changeTutorialPage(prevPage)}
                            title={"Previous"}
                            icon={"arrow-left"}
                        />
                    </div>
                )}

                {nextPage && (
                    <div className="centered tutorial-button-next">
                        <Button
                            onClick={(): void => props.changeTutorialPage(nextPage)}
                            title={"Next"}
                            iconRight={"arrow-right"}
                        />
                    </div>
                )}
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleTutorial: (): void => dispatch(toggleTutorial()),
    changeTutorialPage: (page?: string): void => dispatch(changeTutorialPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialDialog);
