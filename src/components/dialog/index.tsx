import React, { useEffect, FunctionComponent, CSSProperties, ReactNode } from "react";

import Button from "../button";

import "./styles.scss";

interface DialogProps {
    className?: string;
    style?: CSSProperties;
    goBack?: (_?: KeyboardEvent) => void;
    onKeyPress?: (key: string) => void;
    keys?: string[];
    children: ReactNode;
}

const Dialog: FunctionComponent<DialogProps> = (props: DialogProps) => {
    const handleKeyPress = (event: KeyboardEvent): void => {
        if (props.onKeyPress) {
            if (props.keys ? props.keys.includes(event.key) : event.key === "Enter") {
                props.onKeyPress(event.key);
            }
        }

        if (props.goBack) {
            if (event.key === "Escape" || event.key === "Esc") {
                props.goBack(event);
            }
        }
    };

    useEffect(() => {
        if (props.onKeyPress || props.goBack) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return (): void => {
            if (props.onKeyPress || props.goBack) {
                window.removeEventListener("keydown", handleKeyPress);
            }
        };
    });

    return (
        <div className={props.className || "dialog-container white-border"} style={props.style}>
            {props.goBack && (
                <Button icon="arrow-left" onClick={props.goBack} extraClass="dialog-back-button" label="Go Back" />
            )}
            {props.children}
        </div>
    );
};

export default Dialog;
