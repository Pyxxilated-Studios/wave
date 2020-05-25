import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { InventoryState } from "../../store/inventory/types";

import { ItemType } from "../../types";

import EmptySlot from "../empty-slot";
import { MAX_ITEMS_UPGRADE, SPRITE_PIXELS } from "../../constants";

import "./styles.scss";

const STANDARD_HEIGHT = 80;
const EXTENDED_HEIGHT = 120;

interface StateProps {
    inventory: InventoryState;
}

interface OwnProps {
    viewItem: (item: ItemType) => void;
}

type BackpackItemsProps = StateProps & OwnProps;

const BackpackItems: FunctionComponent<BackpackItemsProps> = (props: BackpackItemsProps) => {
    const { items, maxItems } = props.inventory;

    const itemSlots = new Array(maxItems).fill(null);

    for (let i = 0; i < items.length; i++) {
        itemSlots[i] = (
            <button
                onClick={(): void => props.viewItem(items[i])}
                style={{
                    backgroundImage: `url('${items[i].image}')`,
                    width: SPRITE_PIXELS,
                    height: SPRITE_PIXELS,
                    cursor: "pointer",
                }}
            />
        );
    }

    return (
        <div
            className="flex-column white-border backpack-items-container"
            style={{
                minHeight: maxItems === MAX_ITEMS_UPGRADE ? EXTENDED_HEIGHT : STANDARD_HEIGHT,
            }}
        >
            <div className="flex-row">
                <EmptySlot>{itemSlots[0]}</EmptySlot>
                <EmptySlot>{itemSlots[1]}</EmptySlot>
                <EmptySlot>{itemSlots[2]}</EmptySlot>
                <EmptySlot>{itemSlots[3]}</EmptySlot>
            </div>

            <div className="flex-row">
                <EmptySlot>{itemSlots[4]}</EmptySlot>
                <EmptySlot>{itemSlots[5]}</EmptySlot>
                <EmptySlot>{itemSlots[6]}</EmptySlot>
                <EmptySlot>{itemSlots[7]}</EmptySlot>
            </div>

            {maxItems === MAX_ITEMS_UPGRADE && (
                <div className="flex-row">
                    <EmptySlot>{itemSlots[8]}</EmptySlot>
                    <EmptySlot>{itemSlots[9]}</EmptySlot>
                    <EmptySlot>{itemSlots[10]}</EmptySlot>
                    <EmptySlot>{itemSlots[11]}</EmptySlot>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ inventory: state.inventory });

export default connect(mapStateToProps)(BackpackItems);
