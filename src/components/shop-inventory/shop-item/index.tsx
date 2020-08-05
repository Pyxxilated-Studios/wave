import React, { FunctionComponent } from "react";

import { ItemType } from "../../../types";

import EmptySlot from "../../empty-slot";
import ContextMenu from "../../context-menu";

import calculatePrices from "../../../utils/calculate-price";
import { getContext } from "../../../utils/get-context";

import "./styles.scss";

interface ShopItemProps {
    item: ItemType;
    buyItem: () => void;
    charismaModifier: number;
}

const ShopItem: FunctionComponent<ShopItemProps> = (props: ShopItemProps) => {
    const { item, buyItem, charismaModifier } = props;
    const { buyPrice } = calculatePrices(item.price, charismaModifier);

    return (
        <button onClick={buyItem} className="shop-item-container white-border flex-row">
            <EmptySlot style={{ borderRight: "1px solid" }}>
                <ContextMenu context={getContext(item)}>
                    <div className="shop-item-slot" style={{ backgroundImage: `url('${item.image}')` }} />
                </ContextMenu>
            </EmptySlot>

            <div className="flex-row shop-item-text">
                <span className="flex-row shop-item-title">{item.name}</span>

                <span className="flex-row shop-item-price">{buyPrice}</span>
            </div>
        </button>
    );
};

export default ShopItem;
