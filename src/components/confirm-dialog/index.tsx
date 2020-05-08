import React, { useEffect, useCallback, FunctionComponent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Button from "../button";
import { ENTER_KEY, ESC_KEY } from "../../constants";

import "./styles.scss";

interface ConfirmDialogProps {
    open: boolean;
    text: string;
    onClose: () => void;
    cancelIcon: IconProp;
    cancelText: string;
    confirm: () => void;
    acceptIcon: IconProp;
    acceptText: string;
    className?: string;
    acceptKeys?: boolean;
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = (props: ConfirmDialogProps) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            // check if a key is pressed and bound to an action
            if (event.keyCode === ENTER_KEY) {
                props.confirm();
            } else if (event.keyCode === ESC_KEY) {
                props.onClose();
            }
        },
        [props],
    );

    useEffect(() => {
        if (props.open) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return (): void => {
            if (props.open) {
                window.removeEventListener("keydown", handleKeyPress);
            }
        };
    }, [props.open, handleKeyPress]);

    if (!props.open) return null;

    return (
        <div className={`confirm-dialog-container white-border ${props.className || ""}`}>
            <span className="confirm-dialog-text">{props.text}</span>

            <div className="flex-row confirm-dialog-buttons">
                <Button onClick={props.onClose} icon={props.cancelIcon || "times"} title={props.cancelText || "No"} />

                <Button onClick={props.confirm} icon={props.acceptIcon || "check"} title={props.acceptText || "Yes"} />
            </div>
        </div>
    );
};

export default ConfirmDialog;
