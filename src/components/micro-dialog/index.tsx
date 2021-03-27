import { useEffect, useCallback, ReactNode, FunctionComponent } from "react";

import "./styles.scss";
import Button from "../button";

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

    return (
        <div className={`micro-dialog-container white-border ${props.className || ""}`}>
            {!props.noButton && (
                <Button
                    extraClass="micro-dialog-close"
                    noBorder
                    onClick={props.onClose}
                    icon="times"
                    label="Close dialog"
                />
            )}

            {props.children}
        </div>
    );
};

export default MicroDialog;
