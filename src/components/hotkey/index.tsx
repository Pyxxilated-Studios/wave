import React, { FunctionComponent } from "react";

import "./styles.scss";

interface HotkeyProps {
    img: string;
    label: string;
}

const Hotkey: FunctionComponent<HotkeyProps> = (props: HotkeyProps) => {
    return (
        <>
            <div className="hotkey-container">
                <img src={props.img} alt="hotkey" width={55} />
                <span className="hotkey-text">{props.label}</span>
            </div>
        </>
    );
};

export default Hotkey;
