import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SPRITE_PIXELS } from "../../../../../constants";

import Fireball from "./assets/fireball.png";

import "./styles.scss";

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
                        style={{ fontSize: "var(--icon-size)", padding: "1em" }}
                    />
                    <img
                        className="white-border"
                        src={Fireball}
                        alt="fireball"
                        style={{ width: SPRITE_PIXELS, padding: "1em" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SpellTutorial;
