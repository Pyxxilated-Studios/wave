import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../../../store";
import { StatsState } from "../../../../store/stats/types";

import Button from "../../../button";
import MicroDialog from "../../../micro-dialog";

import closeLevelUpDialog from "../../actions/close-level-up-dialog";
import abilityScoreDialog from "../../actions/ability-score-dialog";
import logLevelUp from "../../actions/log-level-up";

import spells from "../../../../data/spells";

import "./styles.scss";

interface DispatchProps {
    closeLevelUpDialog: () => void;
    abilityScoreDialog: () => void;
    logLevelUp: () => void;
}

interface StateProps {
    stats: StatsState;
}

type LevlUpDialogProps = DispatchProps & StateProps;

const LevelUpDialog: FunctionComponent<LevlUpDialogProps> = (props: LevlUpDialogProps) => {
    const { level, levelUp } = props.stats;
    const { health, mana } = levelUp;

    const nextDialog = (): void => {
        props.logLevelUp();
        props.closeLevelUpDialog();
    };
    const unlockedSpell = spells.filter((spell) => spell.unlockLevel === props.stats.level).pop();

    return (
        <MicroDialog onClose={nextDialog} onKeyPress={nextDialog}>
            <span className="level-up-title">
                Level<span className="level-up-level">{` ${level}`}</span>
            </span>

            <div className="flex-column level-up-contents">
                {health !== 0 && (
                    <div className="level-up-value--spacing">
                        Gained<span className="level-up-health">{` +${health} `}</span>
                        Health
                    </div>
                )}
            </div>

            <div className="flex-column level-up-contents">
                {mana !== 0 && (
                    <div className="level-up-value-spacing">
                        Gained
                        <span className="level-up-mana">{` +${mana} `}</span>
                        Mana
                    </div>
                )}
            </div>

            <div className="flex-column level-up-contents">
                {unlockedSpell && (
                    <div className="level-up-value-spacing">
                        You just unlocked the <span className="level-up-unlock-spell">{unlockedSpell.name}</span> spell
                    </div>
                )}
            </div>

            <div className="flex-column level-up-buttons">
                <Button onClick={nextDialog} title={"Okay"} icon={"check"} />
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ stats: state.stats });

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    closeLevelUpDialog: (): void => dispatch(closeLevelUpDialog()),
    abilityScoreDialog: (): void => dispatch(abilityScoreDialog(true)),
    logLevelUp: (): void => dispatch(logLevelUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevelUpDialog);
