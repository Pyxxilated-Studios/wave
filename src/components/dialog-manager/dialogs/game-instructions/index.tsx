import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
// import { isMobile } from "react-device-detect";

import Button from "../../../button";
import Dialog from "../../../dialog";

import loadStartingItems from "../../../inventory/actions/load-starting-items";
import showStartingMessage from "../../actions/show-starting-message";

import ArrowKeys from "./assets/arrow-keys.png";
import DoubleTap from "./assets/double-tap.png";
import Enter from "./assets/enter.png";
import Space from "./assets/space.png";
import Swipe from "./assets/swipe.png";
import WASDKeys from "./assets/wasd-keys.png";

import "./styles.scss";
import { RootDispatch } from "../../../../store";

interface DispatchProps {
    loadStartingItems: () => void;
    showStartingMessage: () => void;
}

type GameInstructionsProps = DispatchProps;

const GameInstructions: FunctionComponent<GameInstructionsProps> = (props: GameInstructionsProps) => {
    const { loadStartingItems, showStartingMessage } = props;

    const mobileVersion = false;
    // if (window.location.search === "?nativeApp=true" || isMobile) {
    //     mobileVersion = true;
    // }

    function handleContinue(): void {
        loadStartingItems();
        showStartingMessage();
    }

    return (
        <Dialog onKeyPress={handleContinue}>
            <div className="game-instructions-title">{"Game Controls"}</div>

            <div className="game-instructions-text">
                {!mobileVersion && <span style={{ paddingBottom: 12 }}>{`MOVEMENT`}</span>}

                <div className={`align-center space-evenly`}>
                    {mobileVersion ? (
                        <>
                            <img src={Swipe} alt="swipe" />
                            <div className="game-instructions-native-text">{"SWIPE and HOLD to MOVE"}</div>
                        </>
                    ) : (
                        <>
                            <img src={ArrowKeys} alt="arrow-keys" style={{ paddingRight: "2em" }} />
                            <img src={WASDKeys} alt="wasd-keys" />
                        </>
                    )}
                </div>

                {mobileVersion ? (
                    <>
                        <img src={DoubleTap} alt="double-tap" />
                        <div className="game-instructions-native-text">{"DOUBLE TAP to ATTACK"}</div>
                    </>
                ) : (
                    <>
                        <span style={{ paddingTop: 12 }}>{`ATTACK`}</span>
                        <div className={`align-center space-evenly`}>
                            <img src={Space} alt="space" height="35em" />
                        </div>

                        <span style={{ paddingTop: 12 }}>{`CONTINUE`}</span>
                        <div className={`align-center space-evenly`}>
                            <img src={Enter} alt="enter" height="45em" />
                        </div>
                    </>
                )}
            </div>

            <div className="flex-column game-instructions-button">
                <Button onClick={handleContinue} title={"Continue"} />
            </div>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    loadStartingItems: (): void => dispatch(loadStartingItems()),
    showStartingMessage: (): void => dispatch(showStartingMessage()),
});

export default connect(null, mapDispatchToProps)(GameInstructions);
