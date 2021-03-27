import { FunctionComponent } from "react";

import "./styles.scss";

interface FloorCounterProps {
    floorNumber: number;
}

const FloorCounter: FunctionComponent<FloorCounterProps> = (props: FloorCounterProps) => {
    return (
        <div className="floor-counter-container">
            <span>{"FLOOR"}</span>

            <span className="floor-counter-value">{props.floorNumber}</span>
        </div>
    );
};

export default FloorCounter;
