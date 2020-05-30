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
    iconRight?: IconProp;
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
                <FontAwesomeIcon
                    className={`${iconClassName} button-float-icon`}
                    icon={props.icon}
                    style={props.iconStyle || {}}
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

            {props.title && <span>{props.title}</span>}

            {props.iconRight && (
                <FontAwesomeIcon
                    className="button-float-icon-right"
                    style={props.iconStyle || {}}
                    icon={props.iconRight}
                />
            )}
        </button>
    );
};

export default Button;
