import React from "react";

import { Point } from "../../types";
import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

import Flames from "./flames.png";

import "./styles.scss";

interface FlameProps {
    children?: React.ReactNode;
    position?: Point;
}

const Flame: React.FunctionComponent<FlameProps> = (props: FlameProps) => {
    const { x: left, y: top } = translateToSpriteCoordinates(props.position ? props.position : { x: 0, y: 0 });

    return (
        <div
            className="flame-container"
            style={{
                top,
                left,
                backgroundImage: `url('${Flames}')`,
            }}
        >
            {props.children}
        </div>
    );
};

export default Flame;
