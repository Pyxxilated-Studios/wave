import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { PlayerState } from "../../../../store/player/types";
import { StatsState } from "../../../../store/stats/types";

import { Spell } from "../../../../types";
import { B_KEY, ESC_KEY } from "../../../../constants";

import toggleSpellbookDialog from "../../actions/toggle-spellbook-dialog";

import spells from "../../../../data/spells";

import MicroDialog from "../../../micro-dialog";
import ViewItem from "../../../view-item";
import SpellButtom from "./spell-button";

import "./styles.scss";

interface DispatchProps {
    toggleSpellbookDialog: () => void;
}

interface StateProps {
    player: PlayerState;
    stats: StatsState;
}

type SpellbookDialogProps = DispatchProps & StateProps;

const SpellbookDialog: FunctionComponent<SpellbookDialogProps> = (props: SpellbookDialogProps) => {
    const [viewSpell, setViewSpell] = useState<Spell>();

    return (
        <MicroDialog
            fullsize
            keys={[B_KEY, ESC_KEY]}
            onClose={props.toggleSpellbookDialog}
            onKeyPress={props.toggleSpellbookDialog}
        >
            <ViewItem open={Boolean(viewSpell)} data={viewSpell} onClose={(): void => setViewSpell(undefined)} />
            <span className="spellbook-dialog-title">{"Spellbook"}</span>
            <div className="spellbook-dialog-container" disable-scroll-lock="true">
                {spells.map((spell) => (
                    <div key={spell.name} className="spellbook-spell">
                        <SpellButtom
                            title={spell.name}
                            onClick={(): void => setViewSpell(spell)}
                            image={spell.image}
                            active={(props.player.spell && props.player.spell.name === spell.name) || false}
                            locked={props.stats.level < spell.unlockLevel}
                            unlockLevel={spell.unlockLevel}
                        />
                    </div>
                ))}
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ player: state.player, stats: state.stats });
const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleSpellbookDialog: (): void => dispatch(toggleSpellbookDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpellbookDialog);
