import { FunctionComponent, CSSProperties, ReactNode } from "react";

import InventorySlot from "./inventory-slot.png";

import { SPRITE_SIZE } from "../../constants";

interface EmptySlotProps {
    margin?: string;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
}

const EmptySlot: FunctionComponent<EmptySlotProps> = (props: EmptySlotProps) => {
    const styles = {
        ...props.style,
        backgroundImage: `url('${InventorySlot}')`,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        margin: props.margin,
    };

    return (
        <div className={props.className || ""} style={styles}>
            {props.children}
        </div>
    );
};

export const DarkenSlot: FunctionComponent = () => {
    return (
        <div
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                width: 40,
                height: 40,
            }}
        />
    );
};

export default EmptySlot;
