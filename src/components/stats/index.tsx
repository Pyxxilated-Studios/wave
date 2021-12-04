import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import ReactTimeout, { ReactTimeoutProps } from "react-timeout";

import { RootState } from "../../store";
import { StatsState } from "../../store/stats/types";
import { ANIMATION_SPEED } from "../../constants";

import calculateModifier from "../../utils/calculate-modifier";

import "./styles.scss";

interface StateProps {
    stats: StatsState;
}

interface OwnProps {
    sideMenu: boolean;
}

type StatsProps = StateProps & OwnProps & ReactTimeoutProps;

interface State {
    statsBgColor: string;
}

class Stats extends Component<StatsProps, State> {
    state: State = {
        statsBgColor: "var(--dark-gray)",
    };

    componentDidUpdate(prevProps: StatsProps): void {
        // detemine when the stats have been updated and are not disabled
        if (prevProps.stats.level !== this.props.stats.level) {
            // animate the container
            this.setState({ statsBgColor: "var(--gray)" });
            // pause the infinite animation after 1 iteration
            this.props.setTimeout && this.props.setTimeout(() => this.stopAnimation(), ANIMATION_SPEED);
        }
    }

    stopAnimation(): void {
        this.setState({ statsBgColor: "var(--dark-gray)" });
    }

    render(): ReactNode {
        const { stats, sideMenu } = this.props;
        const {
            abilities,
            character,
            level,
            experience,
            experienceToLevel,
            health,
            maxHealth,
            mana,
            maxMana,
            gold,
            defence,
        } = stats;

        // if (disabled) return null;

        const { statsBgColor } = this.state;

        const strengthModifier = calculateModifier(abilities.strength);
        const constitutionModifier = calculateModifier(abilities.constitution);
        const dexterityModifier = calculateModifier(abilities.dexterity);
        const charismaModifier = calculateModifier(abilities.charisma);
        const intelligenceModifier = calculateModifier(abilities.intelligence);
        const wisdomModifier = calculateModifier(abilities.wisdom);

        const healthPercentageRemaining = Math.min((health / maxHealth) * 100, 100);

        let healthBorder;
        if (healthPercentageRemaining >= 99) healthBorder = "5px";
        else if (healthPercentageRemaining >= 97) healthBorder = "5px 3px 3px 5px";
        else healthBorder = "5px 0 0 5px";

        const manaPercentageRemaining = Math.min((mana / maxMana) * 100, 100);

        let manaBorder;
        if (manaPercentageRemaining >= 99) manaBorder = "5px";
        else if (manaPercentageRemaining >= 97) manaBorder = "5px 3px 3px 5px";
        else manaBorder = "5px 0 0 5px";

        const columnStyle = "stats-column-spacing";

        return (
            <div className="stats-container flex-row white-border" style={{ backgroundColor: statsBgColor }}>
                <div className="flex-column stats-column-spacing">
                    <div
                        className="flex-row"
                        style={{
                            borderBottom: "solid",
                        }}
                    >
                        <span className="stats-text-info">
                            {character.name.length <= 11 ? character.name : character.name.substr(0, 9) + "..."}
                        </span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <span className="stats-text-spacing">{"LEVEL: "}</span>
                        <span className="stats-text-level">{level}</span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <span className="stats-bar-container stats-health-bar-container">
                            <span className="stats-bar-text flex-row stats-health-bar-text">
                                {health + "/" + maxHealth}
                            </span>
                            <span
                                className="stats-bar-value stats-health-bar-value"
                                style={{
                                    width: `${healthPercentageRemaining}%`,
                                    borderRadius: healthBorder,
                                }}
                            ></span>
                        </span>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"STR: "}</span>
                        <span className="stats-text-melee">
                            {abilities.strength + " (" + (strengthModifier > 0 ? "+" : "") + strengthModifier + ")"}
                        </span>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"CON: "}</span>
                        <span className="stats-text-melee">
                            {abilities.constitution +
                                " (" +
                                (constitutionModifier > 0 ? "+" : "") +
                                constitutionModifier +
                                ")"}
                        </span>
                    </div>
                </div>

                <div className={`flex-column ${columnStyle}`}>
                    <div
                        className="flex-row"
                        style={{
                            borderBottom: "solid",
                        }}
                    >
                        <span className="stats-text-info">{character.race}</span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <span className="stats-text-spacing">{"DEFENCE: "}</span>
                        <span className="stats-text-defence">{defence}</span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <div className="flex-row">
                            <span className="stats-bar-container stats-mana-bar-container">
                                <span className="stats-bar-text flex-row stats-mana-bar-text">
                                    {mana + "/" + maxMana}
                                </span>
                                <span
                                    className="stats-bar-value stats-mana-bar-value"
                                    style={{
                                        width: `${manaPercentageRemaining}%`,
                                        borderRadius: manaBorder,
                                    }}
                                ></span>
                            </span>
                        </div>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"DEX: "}</span>
                        <span className="stats-text-ranged">
                            {abilities.dexterity + " (" + (dexterityModifier > 0 ? "+" : "") + dexterityModifier + ")"}
                        </span>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"CHR: "}</span>
                        <span className="stats-text-ranged">
                            {abilities.charisma + " (" + (charismaModifier > 0 ? "+" : "") + charismaModifier + ")"}
                        </span>
                    </div>
                </div>

                <div className={`flex-column ${columnStyle}`}>
                    <div
                        className="flex-row"
                        style={{
                            borderBottom: "solid",
                        }}
                    >
                        <span className="stats-text-info">{character.cclass}</span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <span className="stats-text-spacing">{"GOLD: "}</span>
                        <span className="stats-text-gold">{gold}</span>
                    </div>

                    <div className="flex-row stats-row-spacing">
                        <div className={`flex-row ${sideMenu ? "" : "flex-1"}`}>
                            <span className="stats-bar-container exp-bar-container">
                                <span className="stats-bar-text flex-row stats-exp-bar-text">
                                    {experience + "/" + experienceToLevel}
                                </span>
                                <span
                                    className="stats-bar-value exp-bar-value"
                                    style={{
                                        width: `${(experience / experienceToLevel) * 100}%`,
                                    }}
                                ></span>
                            </span>
                        </div>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"INT: "}</span>
                        <span className="stats-text-magic">
                            {abilities.intelligence +
                                " (" +
                                (intelligenceModifier > 0 ? "+" : "") +
                                intelligenceModifier +
                                ")"}
                        </span>
                    </div>

                    <div className="flex-row">
                        <span className="stats-text-spacing">{"WIS: "}</span>
                        <span className="stats-text-magic">
                            {abilities.wisdom + " (" + (wisdomModifier > 0 ? "+" : "") + wisdomModifier + ")"}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => ({ stats: state.stats });

export default connect(mapStateToProps)(ReactTimeout(Stats));
