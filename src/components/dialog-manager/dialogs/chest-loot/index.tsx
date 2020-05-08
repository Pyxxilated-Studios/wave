import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState } from "../../../../store";
import { DialogState } from "../../../../store/dialog/types";

import Button from "../../../../components/button";
import MicroDialog from "../../../../components/micro-dialog";

import pickupItem from "../../../inventory/actions/pickup-item";
import openChest from "../../actions/open-chest";
import closeChestDialog from "../../actions/close-chest-dialog";

import "./styles.scss";

interface DispatchProps {
    pickupItem: () => void;
    openChest: () => void;
    closeChestDialog: () => void;
}

interface StateProps {
    dialog: DialogState;
}

type ChestLootProps = DispatchProps & StateProps;

const ChestLoot: FunctionComponent<ChestLootProps> = (props: ChestLootProps) => {
    const { chestOpen } = props.dialog;
    const { openChest } = props;

    useEffect(() => {
        if (!chestOpen) openChest();
    }, [chestOpen, openChest]);

    if (!chestOpen) {
        return null;
    }

    const { gold, experience, item } = chestOpen;

    const handleContinue = (): void => {
        // Do it this way so this dialog is closed first
        props.closeChestDialog();
        // ... before we actually give them their items, which allows
        //     the level up dialog to occur after this dialog.
        props.pickupItem();
    };

    return (
        <MicroDialog onClose={props.closeChestDialog} onKeyPress={handleContinue}>
            <span className="chest-loot-title">{"Chest Loot!"}</span>

            <div className="flex-column chest-loot-contents">
                {gold !== 0 && (
                    <div className="flex-row chest-loot-value-spacing">
                        <span>{"Gold: "}</span>
                        <span className="gold">{gold}</span>
                    </div>
                )}

                {experience !== 0 && (
                    <div className="flex-row chest-loot-value-spacing">
                        <span>{"Experience: "}</span>
                        <span className="experience">{experience}</span>
                    </div>
                )}

                {item && (
                    <div className="flex-row chest-loot-item">
                        <div
                            style={{
                                backgroundImage: `url('${item.image}')`,
                                width: "40px",
                                height: "40px",
                            }}
                        />
                        <span className="flex-column chest-loot-item-name">{item.name}</span>
                    </div>
                )}
            </div>

            <div className="flex-column chest-loot-buttons">
                <Button
                    onClick={handleContinue}
                    title={item ? "Pick Up" : "Continue"}
                    icon={item ? "hand-paper" : "check"}
                />
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ dialog: state.dialog });

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    pickupItem: (): void => dispatch(pickupItem()),
    openChest: (): void => dispatch(openChest()),
    closeChestDialog: (): void => dispatch(closeChestDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChestLoot);
