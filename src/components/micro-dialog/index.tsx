import React, { useEffect, useCallback } from "react";

import { ENTER_KEY, ESC_KEY } from "../../constants";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MicroDialogProps {
    noButton?: boolean;
    onClose: () => void;
    onKeyPress?: () => void;
    className?: string;
    fullsize?: boolean;
    children?: React.ReactNode;
}

const MicroDialog: React.FunctionComponent<MicroDialogProps> = (props: MicroDialogProps) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            if (event.keyCode === ENTER_KEY) {
                props.onKeyPress && props.onKeyPress();
            } else if (event.keyCode === ESC_KEY) {
                props.onClose();
            }
        },
        [props],
    );

    useEffect(() => {
        if (props.onKeyPress) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return (): void => {
            if (props.onKeyPress) {
                window.removeEventListener("keydown", handleKeyPress);
            }
        };
    }, [props.onKeyPress, handleKeyPress]);

    const noSpacing = { top: 0, bottom: 0, left: 0, right: 0 };

    return (
        <div
            style={props.fullsize ? noSpacing : {}}
            className={`micro-dialog-container white-border ${props.className || ""}`}
        >
            {!props.noButton && (
                <button className="micro-dialog-close" onClick={props.onClose}>
                    <FontAwesomeIcon icon="times" />
                </button>
            )}

            {props.children}
        </div>
    );
};

export default MicroDialog;
