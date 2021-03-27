import { FunctionComponent } from "react";

import ArrowKeys from "./assets/keyboard/arrow_keys.png";
import WASDKeys from "./assets/keyboard/wasd_keys.png";

import "./styles.scss";

const MovementTutorial: FunctionComponent = () => {
    return (
        <div className="flex-column tutorial-page-container">
            <div className="tutorial-page-title centered">{"MOVEMENT"}</div>
            <div className="tutorial-page-movement">
                {"Move the player with WASD"} <img src={WASDKeys} alt="wasd-keys" width={150} />
                {"Or with the arrow keys"} <img src={ArrowKeys} alt="arrow-keys" width={150} />
            </div>
        </div>
    );
};

export default MovementTutorial;
