import React from 'react';

import './styles.scss';

const FloorCounter = ({ floorNumber }: { floorNumber: number }) => {
    return (
        <div className="floor-counter__container">
            <span>{'FLOOR'}</span>

            <span className="floor-counter__value">{floorNumber}</span>
        </div>
    );
};

export default FloorCounter;
