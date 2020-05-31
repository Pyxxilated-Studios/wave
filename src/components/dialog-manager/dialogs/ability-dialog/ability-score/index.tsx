import React, { FunctionComponent } from "react";

import Button from "../../../../button";
import { MAX_ABILITY_SCORE } from "../../../../../constants";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AbilityScoreProps {
    name: string;
    value: number;
    minValue: number;
    increment: () => void;
    decrement: () => void;
    points: number;
    tooltip: string;
}

const AbilityScore: FunctionComponent<AbilityScoreProps> = (props: AbilityScoreProps) => (
    <>
        <div className="ability-score-container">
            <span className="ability-score-text">{props.name}:</span>
            <div className="ability-score-tooltip">
                <FontAwesomeIcon icon="question-circle" />
                <span className="ability-score-tooltip-text">{props.tooltip}</span>
            </div>
            <div
                className="ability-score-button"
                style={{
                    visibility: props.points === 0 || props.value === MAX_ABILITY_SCORE ? "hidden" : "visible",
                }}
            >
                <Button icon="caret-right" onClick={props.increment} tiny noBorder />
            </div>
            <span className="ability-score-score-text">{props.value}</span>
            <div
                className="ability-score-button"
                style={{
                    visibility: props.value === props.minValue ? "hidden" : "visible",
                }}
            >
                <Button icon="caret-left" onClick={props.decrement} tiny noBorder />
            </div>
        </div>
    </>
);

export default AbilityScore;
