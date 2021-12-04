import { FunctionComponent } from "react";

import EmptySlot from "../../../../empty-slot";

import "./styles.scss";

interface OwnProps {
    title: string;
    onClick: () => void;
    image: string;
    active: boolean;
    locked: boolean;
    unlockLevel: number;
}

type SpellButtonProps = OwnProps;

const SpellButton: FunctionComponent<SpellButtonProps> = (props: SpellButtonProps) => {
    return (
        <button
            className={`spellbook-button-container white-border ${props.active ? "active" : ""}`}
            onClick={props.onClick}
        >
            <EmptySlot className="white-border button-image">
                <div
                    style={{
                        backgroundImage: `url('${props.image}')`,
                        width: "40px",
                        height: "40px",
                    }}
                />
            </EmptySlot>

            <span>{props.title}</span>

            {props.active && (
                <div className="active-spell">
                    <span>Active</span>
                </div>
            )}
            {props.locked && (
                <div className="locked">
                    <span>Unlocked at level {props.unlockLevel}</span>
                </div>
            )}
        </button>
    );
};

export default SpellButton;
