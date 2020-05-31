import React, { FunctionComponent } from "react";

import Fireball from "./assets/fireball.png";

import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpellTutorial: FunctionComponent = () => {
    return (
        <div className="flex-column tutorial-spell-container">
            <div className="tutorial-page-title">{"SPELLS"}</div>
            <div className="tutorial-page-spell">
                {"Spells are powerful and require mana to cast. Different spells unlock at different levels."}
                <br />
                <br />
                {"Open the spellbook and cast spells with the on-screen buttons"}
                <div className="flex-row tutorial-page-spell-icons">
                    <FontAwesomeIcon
                        icon="book-open"
                        className="white-border"
                        style={{ fontSize: "65px", padding: "15px" }}
                    />
                    <img className="white-border" src={Fireball} alt="fireball" width={100} />
                </div>
            </div>
        </div>
    );
};

export default SpellTutorial;
