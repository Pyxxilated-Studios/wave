import React, { FunctionComponent } from "react";

import Spacebar from "./assets/keyboard/space_key.png";

import "./styles.scss";

const CombatTutorial: FunctionComponent = () => {
    return (
        <div className="flex-column tutorial-combat-container">
            <div className="tutorial-page-title">{"COMBAT"}</div>
            <div className="tutorial-page-combat">
                {"Attack your enemies with 'Spacebar'"} <br />
                <div className="tutorial-page-combat-buttons">
                    <img src={Spacebar} alt="spacebar" width={100} />
                </div>
                {
                    "To hit enemies, your attack must match or exceed their defence. Your attack is equal to a d20 + STR/DEX/INT, depending on whether the attack is melee, ranged or spell. Defence is a combination of your armour and DEX."
                }
            </div>
        </div>
    );
};

export default CombatTutorial;
