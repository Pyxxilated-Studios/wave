import { Component, ReactNode } from "react";
import { connect } from "react-redux";

import { RootState, RootDispatch } from "../../store";
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
}

interface OwnProps {
    disabled: boolean;
}

type InventoryProps = DispatchProps & StateProps & OwnProps;

type State = { newItemIndicator: boolean };

class Inventory extends Component<InventoryProps, State> {
    state: State = {
        newItemIndicator: false,
    };

    componentDidUpdate(prevProps: StateProps, prevState: State): void {
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

    render(): ReactNode {
        const { newItemIndicator } = this.state;
        const { disabled, dialog } = this.props;

        const open = dialog.reason.inventory;

        return (
            <div className="inventory-container">
                <Button
                    indicator={newItemIndicator}
                    onClick={(): void => this._toggleInventory()}
                    icon={"briefcase"}
                    iconRight={open ? "times" : undefined}
                    title={open ? "Close" : "Inventory"}
                    style={{ visibility: disabled ? "hidden" : "visible" }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => ({ snackbar: state.snackbar, dialog: state.dialog });

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => ({
    toggleInventory: (): void => dispatch(toggleInventory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
