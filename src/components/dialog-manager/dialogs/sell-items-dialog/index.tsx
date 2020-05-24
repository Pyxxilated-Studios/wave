import React, { useState, FunctionComponent } from "react";

import Backpack from "../inventory-dialog/backpack.png";

import { ItemType } from "../../../../types";

import BackpackItems from "../../../backpack-items";
import MicroDialog from "../../../micro-dialog";
import ViewItem from "../../../view-item";

import "./styles.scss";

interface SellItemsDialogProps {
    onClose: () => void;
}

const SellItemsDialog: FunctionComponent<SellItemsDialogProps> = (props: SellItemsDialogProps) => {
    const [sellItem, setSellItem] = useState<ItemType>();

    return (
        <MicroDialog onClose={props.onClose} fullsize className="centered">
            <ViewItem
                open={Boolean(sellItem)}
                data={sellItem}
                sell={true}
                onClose={(): void => setSellItem(undefined)}
            />

            <div className="flex-column sell-items__container" style={{ backgroundImage: `url(${Backpack})` }}>
                <BackpackItems viewItem={(item): void => setSellItem(item)} />
            </div>
        </MicroDialog>
    );
};

export default SellItemsDialog;
