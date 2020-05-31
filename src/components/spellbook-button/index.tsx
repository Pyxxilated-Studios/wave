import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../store";
import { PlayerState } from "../../store/player/types";

import toggleSpellbookDialog from "../dialog-manager/actions/toggle-spellbook-dialog";
import { castSpell } from "../player/actions/player-cast-spell";

import Button from "../button";

import "./styles.scss";

interface DispatchProps {
    castSpell: () => void;
    toggleSpellbookDialog: () => void;
}

interface StateProps {
    player: PlayerState;
}

type SpellbookButtonProps = DispatchProps & StateProps;

const SpellbookButton: FunctionComponent<SpellbookButtonProps> = (props: SpellbookButtonProps) => {
    return (
        <div className={"spellbook-container"}>
            <Button icon="book-open" onClick={props.toggleSpellbookDialog} tiny />

            {props.player.spell && (
                <button
                    className={"white-border spell"}
                    style={{
                        backgroundImage: `url('${props.player.spell.image}')`,
                    }}
                    onClick={props.castSpell}
                ></button>
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ player: state.player });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleSpellbookDialog: (): void => dispatch(toggleSpellbookDialog()),
    castSpell: (): void => dispatch(castSpell()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellbookButton);
