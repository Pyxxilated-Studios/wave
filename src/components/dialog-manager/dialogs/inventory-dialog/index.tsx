import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";

import { ItemType } from "../../../../types";
import { I_KEY, ESC_KEY } from "../../../../constants";

import Dialog from "../../../dialog";
import BackpackItems from "../../../backpack-items";
import EquippedItems from "../../../equipped-items";
import ViewItem from "../../../view-item";

import toggleInventory from "../../actions/toggle-inventory";

import Backpack from "./backpack.png";

import "./styles.scss";
import { RootDispatch } from "../../../../store";

interface DispatchProps {
    toggleInventory: () => void;
}

type InventoryDialogProps = DispatchProps;

const InventoryDialog: FunctionComponent<InventoryDialogProps> = (props: InventoryDialogProps) => {
    const [viewItem, setViewItem] = useState<ItemType | undefined>(undefined);

    return (
        <Dialog keys={[I_KEY, ESC_KEY]} onKeyPress={props.toggleInventory}>
            {viewItem && (
                <ViewItem open={Boolean(viewItem)} data={viewItem} onClose={(): void => setViewItem(undefined)} />
            )}

            <div className="flex-row inventory-dialog-container">
                <div className="flex-column inventory-dialog-child" style={{ width: "40%" }}>
                    <EquippedItems />
                </div>

                <div className="flex-column inventory-dialog-child" style={{ width: "60%" }}>
                    <div className="inventory-dialog-backpack" style={{ backgroundImage: `url(${Backpack})` }}>
                        <BackpackItems viewItem={(item: ItemType): void => setViewItem(item)} />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleInventory: (): void => dispatch(toggleInventory()),
});
export default connect(null, mapDispatchToProps)(InventoryDialog);
