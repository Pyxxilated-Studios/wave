import { FunctionComponent, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import EmptySlot from "../empty-slot";

import { SPRITE_SIZE } from "../../constants";

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
    label?: string;
}

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    function handleClick(): void {
        props.onClick && props.onClick();
    }

    return (
        <button
            className={`button-container ${props.noBorder ? "" : "white-border"} ${
                props.small ? "button-container-small" : props.tiny ? "button-container-tiny" : ""
            } ${props.extraClass ? props.extraClass : ""}`}
            style={props.style || {}}
            onClick={handleClick}
            aria-label={props.label}
        >
            {props.indicator && <span className="button-indicator">o</span>}
            {props.icon && (
                <FontAwesomeIcon
                    className={`button-icon button-float-icon`}
                    icon={props.icon}
                    style={{ ...props.iconStyle, paddingRight: `${props.title ? "10px" : "0"}` }}
                />
            )}
            {props.image && (
                <EmptySlot className="white-border button-image">
                    <div
                        style={{
                            backgroundImage: `url('${props.image}')`,
                            width: SPRITE_SIZE,
                            height: SPRITE_SIZE,
                        }}
                    />
                </EmptySlot>
            )}

            {props.title && <span className="button-title">{props.title}</span>}

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
