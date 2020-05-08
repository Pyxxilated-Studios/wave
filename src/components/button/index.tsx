import React, { FunctionComponent, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import EmptySlot from "../empty-slot";

import { SPRITE_PIXELS } from "../../constants";

import "./styles.scss";

interface ButtonProps {
    icon?: IconProp;
    title?: string;
    iconStyle?: CSSProperties;
    style?: CSSProperties;
    indicator?: boolean;
    onClick?: () => void;
    small?: boolean;
    tiny?: boolean;
    image?: string;
    noBorder?: boolean;
    extraClass?: string;
}

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    function handleClick(): void {
        props.onClick && props.onClick();
    }

    const iconClassName = `button-icon ${props.indicator ? "button-indicator" : ""}`;

    return (
        <button
            className={`button-container ${props.noBorder ? "" : "white-border"} ${
                props.small ? "button-container-small" : props.tiny ? "button-container-tiny" : ""
            } ${props.extraClass ? props.extraClass : ""}`}
            style={props.style || {}}
            onClick={handleClick}
        >
            {props.icon && (
                // <FontAwesomeIcon icon= />
                <FontAwesomeIcon
                    className={iconClassName}
                    icon={props.icon}
                    style={props.iconStyle ? props.iconStyle : {}}
                />
            )}
            {props.image && (
                <EmptySlot className="white-border button-image">
                    <div
                        style={{
                            backgroundImage: `url('${props.image}')`,
                            width: SPRITE_PIXELS,
                            height: SPRITE_PIXELS,
                        }}
                    />
                </EmptySlot>
            )}

            {props.title && <span style={props.icon ? { paddingLeft: "10px" } : {}}>{props.title}</span>}
        </button>
    );
};

export default Button;
