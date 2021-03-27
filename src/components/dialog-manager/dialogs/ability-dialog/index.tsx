import { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { DialogState } from "../../../../store/dialog/types";
import { SystemState } from "../../../../store/system/types";
import { setAbilityIndicator } from "../../../../store/system/actions";

import { Ability } from "../../../../types";

import AbilityScore from "./ability-score";
import Button from "../../../button";
import Dialog from "../../../dialog";
import MicroDialog from "../../../micro-dialog";

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
    openedAbilityDialog: () => void;
}

interface StateProps {
    dialog: DialogState;
    system: SystemState;
}

type AbilityDialogProps = DispatchProps & StateProps;

const AbilityDialog: FunctionComponent<AbilityDialogProps> = (props: AbilityDialogProps) => {
    const { constitution, dexterity, intelligence, strength, wisdom, charisma, points } = props.dialog.abilities;
    const {
        constitution: minConstitution,
        intelligence: minIntelligence,
        strength: minStrength,
        dexterity: minDexterity,
        wisdom: minWisdom,
        charisma: minCharisma,
    } = props.dialog.abilitiesMinimum;

    const abilityScores = (
        <>
            <span className="ability-score-title">Modify your Abilities</span>
            <div className="flex-column ability-score-dialog-container">
                <AbilityScore
                    name="Strength"
                    value={strength}
                    minValue={minStrength}
                    increment={(): void => props.increment("strength")}
                    decrement={(): void => props.decrement("strength")}
                    points={points}
                    tooltip={"Hit better up close!"}
                />
                <AbilityScore
                    name="Constitution"
                    value={constitution}
                    minValue={minConstitution}
                    increment={(): void => props.increment("constitution")}
                    decrement={(): void => props.decrement("constitution")}
                    points={points}
                    tooltip={"Gain more health!"}
                />
                <AbilityScore
                    name="Dexterity"
                    value={dexterity}
                    minValue={minDexterity}
                    increment={(): void => props.increment("dexterity")}
                    decrement={(): void => props.decrement("dexterity")}
                    points={points}
                    tooltip={"Defend yourself better! Hit better at range!"}
                />
                <AbilityScore
                    name="Charisma"
                    value={charisma}
                    minValue={minCharisma}
                    increment={(): void => props.increment("charisma")}
                    decrement={(): void => props.decrement("charisma")}
                    points={points}
                    tooltip={"Get better prices!"}
                />
                <AbilityScore
                    name="Intelligence"
                    value={intelligence}
                    minValue={minIntelligence}
                    increment={(): void => props.increment("intelligence")}
                    decrement={(): void => props.decrement("intelligence")}
                    points={points}
                    tooltip={"Gain more mana! Hit better with magic!"}
                />
                <AbilityScore
                    name="Wisdom"
                    value={wisdom}
                    minValue={minWisdom}
                    increment={(): void => props.increment("wisdom")}
                    decrement={(): void => props.decrement("wisdom")}
                    points={points}
                    tooltip={"Restore more with potions!"}
                />
                <span className="ability-score-dialog-text">
                    Ability Points remaining:
                    <span className="ability-score-dialog-points">{points}</span>
                </span>
                <Button title="Confirm" onClick={props.confirmAbilityScoreDialog} small={true} label="Confirm" />
            </div>
        </>
    );

    if (props.system.abilityScoreIndicator) {
        props.openedAbilityDialog();
    }

    if (props.dialog.reason.playerOpenedAbilityDialog) {
        return (
            <MicroDialog
                fullsize
                keys={["Escape", "Esc", "U", "u"]}
                onKeyPress={props.confirmAbilityScoreDialog}
                onClose={props.closeDialog}
            >
                {abilityScores}
            </MicroDialog>
        );
    }

    return (
        <Dialog
            keys={["Enter", "Esc", "Escape", "U", "u"]}
            onKeyPress={(key): void => {
                if (key === "Enter") {
                    props.confirmAbilityScoreDialog();
                } else if (key === "Escape" || key === "Esc") {
                    props.backToCharacterCreation();
                }
            }}
            goBack={props.backToCharacterCreation}
        >
            {abilityScores}
        </Dialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog, system: state.system });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    increment: (ability: Ability): void => dispatch(increment(ability)),
    decrement: (ability: Ability): void => dispatch(decrement(ability)),
    confirmAbilityScoreDialog: (): void => dispatch(confirmAbilityScoreDialog()),
    backToCharacterCreation: (): void => dispatch(backToCharacterCreation()),
    closeDialog: (): void => dispatch(closeDialog()),
    openedAbilityDialog: (): void => dispatch(setAbilityIndicator(false)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AbilityDialog);
