import React, { useEffect, useCallback, ReactNode, FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";

interface MicroDialogProps {
    noButton?: boolean;
    onClose: () => void;
    onKeyPress?: () => void;
    keys?: string[];
    className?: string;
    fullsize?: boolean;
    children?: ReactNode;
}

const MicroDialog: FunctionComponent<MicroDialogProps> = (props: MicroDialogProps) => {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent): void => {
            if (event.key === "Enter") {
                props.onKeyPress && props.onKeyPress();
            } else if (event.key === "Escape" || event.key === "Esc") {
                props.onClose();
            } else if (props.keys && props.keys.includes(event.key)) {
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
