import React, { useState, FunctionComponent, ReactNode } from "react";
import { connect } from "react-redux";

import { ENTER_KEY, ESC_KEY } from "../../../../constants";

import Button from "../../../button";
import Dialog from "../../../dialog";
import SellItemsDialog from "../sell-items-dialog";
import ShopKeeper from "../../../shop-keeper";
import ShopInventory from "../../../shop-inventory";
import closeDialog from "../../actions/close-dialog";

import "./styles.scss";
import { RootDispatch } from "../../../../store";

interface DispatchProps {
    closeDialog: () => void;
}

type ShopDialogProps = DispatchProps;

const ShopDialog: FunctionComponent<ShopDialogProps> = (props: ShopDialogProps) => {
    const { closeDialog } = props;

    const [welcome, setWelcome] = useState(true);
    const [sellItems, setSellItems] = useState<ReactNode>();

    const handleOpenSellItems = (): void => {
        setSellItems(<SellItemsDialog onClose={(): void => setSellItems(undefined)} />);
    };

    if (welcome) {
        return (
            <Dialog
                keys={[ENTER_KEY, ESC_KEY]}
                onKeyPress={(key): void => {
                    if (key === ENTER_KEY) {
                        setWelcome(false);
                    } else {
                        closeDialog();
                    }
                }}
            >
                <div className="flex-column space-between flex-1">
                    <span className="shop-dialog-title">{"Shop"}</span>

                    <div className="flex-row">
                        <ShopKeeper />

                        <span className="flex-column shop-dialog-text">{"Welcome traveler! Please, come in..."}</span>
                    </div>

                    <div className="flex-row shop-dialog-button">
                        <Button small onClick={closeDialog} icon="walking" title={"Leave"} />

                        <Button
                            small
                            onClick={(): void => setWelcome(false)}
                            icon="angle-double-right"
                            title={"Shop"}
                        />
                    </div>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog
            keys={[ESC_KEY]}
            onKeyPress={(): void => {
                closeDialog();
            }}
        >
            {sellItems}

            <div className="flex-column shop-dialog-container">
                <ShopInventory />

                <div className="flex-row shop-dialog-button">
                    <Button small onClick={closeDialog} icon="walking" title={"Leave"} />

                    <Button small onClick={handleOpenSellItems} icon="coins" title={"Sell"} />
                </div>
            </div>
        </Dialog>
    );
};

const mapActionsToDispatch = (dispatch: RootDispatch): DispatchProps => ({
    closeDialog: (): void => dispatch(closeDialog()),
});

export default connect(null, mapActionsToDispatch)(ShopDialog);
