import React, { FunctionComponent } from "react";

import "./styles.scss";

interface HealthBarProps {
    value: number;
    max: number;
}

const HealthBar: FunctionComponent<HealthBarProps> = (props: HealthBarProps) => {
    // hide hp bars on full health units
    const fullHp = props.value === props.max;

    return (
        <span className="flex-row">
            <span
                className="health-bar-container"
                style={{
                    width: fullHp ? 0 : 38,
                    border: fullHp ? "none" : "1px solid var(--green)",
                }}
            >
                <span className="health-bar-value" style={{ width: `${(props.value / props.max) * 100}%` }} />
            </span>
        </span>
    );
};

export default HealthBar;
