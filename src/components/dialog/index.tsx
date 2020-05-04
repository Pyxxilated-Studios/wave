import React, { useEffect } from "react";

import { ENTER_KEY, ESC_KEY } from "../../constants";

import "./styles.scss";
import Button from "../button";

interface DialogProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactElement | React.ReactElement[];
    goBack?: (_?: any) => void;
    onKeyPress?: (key: number) => void;
    keys?: number[];
}

const Dialog = (props: DialogProps) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (props.onKeyPress) {
            if (props.keys ? props.keys.includes(event.keyCode) : event.keyCode === ENTER_KEY) {
                props.onKeyPress(event.keyCode);
            }
        }

        if (props.goBack) {
            if (event.keyCode === ESC_KEY) {
                props.goBack(event);
            }
        }
    };

    useEffect(() => {
        if (props.onKeyPress || props.goBack) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            if (props.onKeyPress || props.goBack) {
                window.removeEventListener("keydown", handleKeyPress);
            }
        };
    });

    return (
        <div className={props.className || "dialog-container white-border"} style={props.style}>
            {props.goBack && (
                <Button icon="arrow-left" onClick={props.goBack} extraClass="dialog-back-button" />
                // <button onClick={props.goBack} className="dialog__back-button">
                //     <i className={`fa fa-arrow-left`} />
                // </button>
            )}
            {props.children}
        </div>
    );
};

export default Dialog;
