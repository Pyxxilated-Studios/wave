import React from 'react';

import InventorySlot from './inventory-slot.png';
import { SPRITE_PIXELS } from '../../constants';

interface EmptySlotProps {
    margin?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactElement | React.ReactElement[];
}

const EmptySlot = (props: EmptySlotProps) => {
    const styles = {
        ...props.style,
        backgroundImage: `url('${InventorySlot}')`,
        width: SPRITE_PIXELS,
        height: SPRITE_PIXELS,
        margin: props.margin,
    };

    return (
        <div className={props.className || ''} style={styles}>
            {props.children}
        </div>
    );
};

export const DarkenSlot = () => {
    return (
        <div
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                width: 40,
                height: 40,
            }}
        />
    );
};

export default EmptySlot;
