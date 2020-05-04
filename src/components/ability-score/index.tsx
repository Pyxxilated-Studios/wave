import React from "react";

import Button from "../button";
import { MAX_ABILITY_SCORE } from "../../constants";

import "./styles.scss";

interface AbilityScoreProps {
    name: string;
    value: number;
    minValue: number;
    increment: () => void;
    decrement: () => void;
    points: number;
}

const AbilityScore: React.FunctionComponent<AbilityScoreProps> = ({
    name,
    value,
    minValue,
    increment,
    decrement,
    points,
}: AbilityScoreProps) => {
    return (
        <>
            <div className="ability-score-container">
                <span className="ability-score-text">{name}:</span>
                <div
                    className="ability-score-button"
                    style={{
                        visibility: points === 0 || value === MAX_ABILITY_SCORE ? "hidden" : "visible",
                    }}
                >
                    <Button title=" " icon="caret-right" onClick={increment} tiny={true} noBorder={true} />
                </div>
                <span className="ability-score-score-text">{value}</span>
                <div
                    className="ability-score-button"
                    style={{
                        visibility: value === minValue ? "hidden" : "visible",
                    }}
                >
                    <Button title=" " icon="caret-left" onClick={decrement} tiny={true} noBorder={true} />
                </div>
            </div>
        </>
    );
};

export default AbilityScore;
