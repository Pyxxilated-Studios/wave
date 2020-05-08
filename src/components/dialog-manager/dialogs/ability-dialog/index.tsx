import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { DialogState } from "../../../../store/dialog/types";
import { RootState } from "../../../../store";

import { Ability } from "../../../../types";
import { U_KEY, ENTER_KEY, ESC_KEY } from "../../../../constants";

import AbilityScore from "../../../ability-score";
import Button from "../../../button";
import Dialog from "../../../dialog";

import { increment, decrement } from "./actions/alter-ability-score";
import backToCharacterCreation from "../../actions/back-to-character-creation";
import confirmAbilityScoreDialog from "../../actions/confirm-ability-score-dialog";
import closeDialog from "../../actions/close-dialog";

import "./styles.scss";

interface DispatchProps {
    increment: (ability: Ability) => void;
    decrement: (ability: Ability) => void;
    confirmAbilityScoreDialog: () => void;
    backToCharacterCreation: () => void;
    closeDialog: () => void;
}

interface StateProps {
    dialog: DialogState;
}

type AbilityDialogProps = DispatchProps & StateProps;

const AbilityDialog: FunctionComponent<AbilityDialogProps> = ({
    dialog,
    increment,
    decrement,
    confirmAbilityScoreDialog,
    backToCharacterCreation,
    closeDialog,
}: AbilityDialogProps) => {
    const { constitution, dexterity, intelligence, strength, wisdom, charisma, points } = dialog.abilities;
    const {
        constitution: minConstitution,
        intelligence: minIntelligence,
        strength: minStrength,
        dexterity: minDexterity,
        wisdom: minWisdom,
        charisma: minCharisma,
    } = dialog.abilitiesMinimum;

    const goBack = (): void => {
        if (!dialog.reason.playerOpenedAbilityDialog && !dialog.reason.fromLevelUp) {
            backToCharacterCreation();
        }
    };

    return (
        <Dialog
            keys={[ENTER_KEY, ESC_KEY, U_KEY]}
            onKeyPress={(key): void => {
                if (key === ENTER_KEY) {
                    confirmAbilityScoreDialog();
                } else if (dialog.reason.playerOpenedAbilityDialog || dialog.reason.fromLevelUp) {
                    if (key === U_KEY || key === ESC_KEY) {
                        closeDialog();
                    }
                } else if (key === ESC_KEY) {
                    backToCharacterCreation();
                }
            }}
            goBack={goBack}
        >
            <span
                className="ability-score-title"
                style={
                    dialog.reason.playerOpenedAbilityDialog || dialog.reason.fromLevelUp ? { marginLeft: "0px" } : {}
                }
            >
                Modify your Abilities
            </span>
            <div className="flex-column ability-score-dialog-container">
                <AbilityScore
                    name="Strength"
                    value={strength}
                    minValue={minStrength}
                    increment={(): void => increment("strength")}
                    decrement={(): void => decrement("strength")}
                    points={points}
                />
                <AbilityScore
                    name="Constitution"
                    value={constitution}
                    minValue={minConstitution}
                    increment={(): void => increment("constitution")}
                    decrement={(): void => decrement("constitution")}
                    points={points}
                />
                <AbilityScore
                    name="Dexterity"
                    value={dexterity}
                    minValue={minDexterity}
                    increment={(): void => increment("dexterity")}
                    decrement={(): void => decrement("dexterity")}
                    points={points}
                />
                <AbilityScore
                    name="Charisma"
                    value={charisma}
                    minValue={minCharisma}
                    increment={(): void => increment("charisma")}
                    decrement={(): void => decrement("charisma")}
                    points={points}
                />
                <AbilityScore
                    name="Intelligence"
                    value={intelligence}
                    minValue={minIntelligence}
                    increment={(): void => increment("intelligence")}
                    decrement={(): void => decrement("intelligence")}
                    points={points}
                />
                <AbilityScore
                    name="Wisdom"
                    value={wisdom}
                    minValue={minWisdom}
                    increment={(): void => increment("wisdom")}
                    decrement={(): void => decrement("wisdom")}
                    points={points}
                />
                <span className="ability-score-dialog-text">
                    Ability Points remaining:
                    <span className="ability-score-dialog-points">{points}</span>
                </span>
                <Button title="Confirm" onClick={confirmAbilityScoreDialog} small={true} />
            </div>
        </Dialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog });
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    increment: (ability: Ability): void => dispatch(increment(ability)),
    decrement: (ability: Ability): void => dispatch(decrement(ability)),
    confirmAbilityScoreDialog: (): void => dispatch(confirmAbilityScoreDialog()),
    backToCharacterCreation: (): void => dispatch(backToCharacterCreation()),
    closeDialog: (): void => dispatch(closeDialog()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AbilityDialog);
