import React, { FunctionComponent } from "react";

import "./styles.scss";

interface StatsItemProps {
    stats: { name: string; value: string | number };
}

const StatsItem: FunctionComponent<StatsItemProps> = (props: StatsItemProps) => {
    const { name, value } = props.stats;

    const getColor = (name: string): string => {
        switch (name) {
            case "damage":
            case "DMG over time":
                return "light-red";
            case "effect":
            case "range":
            case "defence bonus":
                return "purple";
            case "heal":
            case "health":
                return "green";
            case "mana":
            case "mana cost":
                return "blue";
            case "chance":
            case "slots":
            case "VS. dragon":
            case "VS. lich":
            case "price":
                return "orange";
            default:
                return "";
        }
    };

    if (name === "description") {
        return (
            <>
                <div className="flex-row stats-item-container" style={{ paddingTop: "20px" }}>
                    <span>{name}:</span>
                </div>

                <span className="flex-row stats-item-description">{value}</span>
            </>
        );
    }

    return (
        <div className="flex-row stats-item-container stats-item-container">
            <span>{name}</span>

            <span style={{ color: `var(--${getColor(name)})` }}>{`${value}`}</span>
        </div>
    );
};

export default StatsItem;
