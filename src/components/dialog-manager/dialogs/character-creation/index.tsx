import { useState, useRef, FunctionComponent, ChangeEvent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { DialogState } from "../../../../store/dialog/types";

import SelectButtonGroup from "../../../select-button/group";
import Button from "../../../button";
import Dialog from "../../../dialog";

import createCharacter from "./actions/create-character";
import setClass from "./actions/set-class";
import setRace from "./actions/set-race";
import errorMessage from "../../actions/error-message";
import mainGameDialog from "../../actions/game-dialog";

import "./styles.scss";

interface DispatchProps {
    createCharacter: (name: string) => void;
    errorMessage: (message: string) => void;
    setClass: (cls: string) => void;
    setRace: (race: string) => void;
    mainGameDialog: () => void;
}

interface StateProps {
    dialog: DialogState;
}

type CharacterCreationProps = StateProps & DispatchProps;

const CharacterCreation: FunctionComponent<CharacterCreationProps> = (props: CharacterCreationProps) => {
    const [characterName, setCharacterName] = useState(props.dialog.character.name);

    function handleContinue(): void {
        if (characterName.trim().length > 0) {
            props.createCharacter(characterName);
        } else {
            props.errorMessage("Please enter a name");
        }
    }

    const continueRef = useRef<HTMLButtonElement>(null);

    return (
        <Dialog
            keys={["Enter", "Escape", "Esc"]}
            onKeyPress={(key): void => {
                if (key === "Enter") {
                    // For whatever reason, we have to use a ref othwerwise the component isn't updated correctly
                    continueRef.current?.click();
                } else if (key === "Escape" || key === "Esc") {
                    props.mainGameDialog();
                }
            }}
            goBack={props.mainGameDialog}
        >
            <div className="character-creation-title">{"Character Creation"}</div>

            <div className="character-creation-text">
                <span style={{ paddingBottom: "0.5em" }}>{`Your Character's Name`}</span>

                <input
                    id="characterNameInput"
                    name="Character name"
                    type="text"
                    maxLength={512}
                    className="white-border character-creation-input"
                    value={characterName}
                    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                        setCharacterName(event.currentTarget.value)
                    }
                />

                <span style={{ paddingTop: 12 }}>{`Your Race`}</span>
                <div className="container space-around">
                    <SelectButtonGroup
                        key=""
                        values={["Human", "Elf", "Dwarf"]}
                        select={(value: string): boolean => value === props.dialog.character.race}
                        onClick={props.setRace}
                    />
                </div>

                <span style={{ paddingTop: 12 }}>{`Your Class`}</span>
                <div className="container space-around">
                    <SelectButtonGroup
                        values={["Fighter", "Wizard", "Ranger"]}
                        select={(value: string): boolean => value === props.dialog.character.cclass}
                        onClick={props.setClass}
                    />
                </div>
            </div>

            <div className="flex-column character-creation-button">
                <Button onClick={handleContinue} title="Continue" />
                <button ref={continueRef} style={{ display: "none" }} onClick={handleContinue} />
            </div>
        </Dialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    createCharacter: (name: string): void => dispatch(createCharacter(name)),
    errorMessage: (message: string): void => dispatch(errorMessage(message)),
    setClass: (cls: string): void => dispatch(setClass(cls)),
    setRace: (race: string): void => dispatch(setRace(race)),
    mainGameDialog: (): void => dispatch(mainGameDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreation);
