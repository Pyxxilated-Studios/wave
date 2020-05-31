import React, { FunctionComponent } from "react";

import BKey from "./assets/keyboard/b_key.png";
import HKey from "./assets/keyboard/h_key.png";
import IKey from "./assets/keyboard/i_key.png";
import JKey from "./assets/keyboard/j_key.png";
import UKey from "./assets/keyboard/u_key.png";

import Hotkey from "../../../../hotkey";

import "./styles.scss";

const HotkeyPage: FunctionComponent = () => {
    return (
        <div className="flex-column tutorial-hotkeys-container">
            <div className="tutorial-page-title">{"MENU HOTKEYS"}</div>
            <div className="tutorial-page-hotkeys">
                <Hotkey img={BKey} label={"Spellbook"} />
                <Hotkey img={HKey} label={"Help"} />
                <Hotkey img={IKey} label={"Inventory"} />
                <Hotkey img={JKey} label={"Journal"} />
                <Hotkey img={UKey} label={"Abilities"} />
            </div>
        </div>
    );
};

export default HotkeyPage;
