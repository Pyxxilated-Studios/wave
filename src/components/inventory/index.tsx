import React, { Component } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { DialogState } from "../../store/dialog/types";
import { SnackbarState } from "../../store/snackbar/types";

import Button from "../button";

import toggleInventory from "../dialog-manager/actions/toggle-inventory";

import "./styles.scss";

interface DispatchProps {
    toggleInventory: () => void;
}

interface StateProps {
    dialog: DialogState;
    snackbar: SnackbarState;
    disabled: boolean;
    sideMenu: boolean;
}

type InventoryProps = DispatchProps & StateProps;

type InventoryState = { newItemIndicator: boolean };

class Inventory extends Component<InventoryProps> {
    state: InventoryState = {
        newItemIndicator: false,
    };

    componentDidUpdate(prevProps: StateProps, prevState: InventoryState): void {
        const { inventory } = this.props.dialog.reason;
        const { itemReceived, itemDropped } = this.props.snackbar;
        const lastItemReceived = prevProps.snackbar.itemReceived;
        const lastItemDropped = prevProps.snackbar.itemDropped;

        if (lastItemDropped !== itemDropped && itemDropped && !inventory) {
            // see if any items were dropped
            this.setState({ newItemIndicator: true });
        } else if (lastItemReceived !== itemReceived && itemReceived && !inventory) {
            // see if any items were received
            this.setState({ newItemIndicator: true });
        } else if (inventory && prevState.newItemIndicator) {
            // see if inventory is opened and there was a new item
            this.setState({ newItemIndicator: false });
        }
    }

    _toggleInventory(): void {
        // We can turn off the indicator if the inventory is opened
        // If we are closing the inventory, it is okay to turn off
        // indicator since it should be false already
        this.setState({ newItemIndicator: false });
        this.props.toggleInventory();
    }

    render(): React.ReactElement {
        const { newItemIndicator } = this.state;
        const { disabled, dialog, sideMenu } = this.props;

        const open = dialog.reason.inventory;

        return (
            <div className="flex-row inventory-container">
                {!disabled && (
                    <Button
                        small={sideMenu}
                        indicator={newItemIndicator}
                        onClick={this._toggleInventory.bind(this)}
                        icon={open ? "times" : "briefcase"}
                        title={open ? "Close" : "Inventory"}
                        style={{
                            width: 180,
                            transition: "width .25s ease-out",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            backgroundColor: "var(--dark-gray)",
                        }}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): any => ({ snackbar: state.snackbar, dialog: state.dialog });

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    toggleInventory: (): void => dispatch(toggleInventory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
