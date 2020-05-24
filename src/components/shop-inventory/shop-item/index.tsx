import React, { FunctionComponent } from "react";

import EmptySlot from "../../empty-slot";
import calculatePrices from "../../../utils/calculate-price";

import "./styles.scss";
import { ItemType } from "../../../types";

interface ShopItemProps {
    item: ItemType;
    buyItem: () => void;
    charismaModifier: number;
}

const ShopItem: FunctionComponent<ShopItemProps> = (props: ShopItemProps) => {
    const { item, buyItem, charismaModifier } = props;
    const { buyPrice } = calculatePrices(item.value, charismaModifier);

    return (
        <button onClick={buyItem} className="shop-item-container white-border flex-row">
            <EmptySlot style={{ borderRight: "1px solid" }}>
                <div className="shop-item-slot" style={{ backgroundImage: `url('${item.image}')` }} />
            </EmptySlot>

            <div className="flex-row shop-item-text">
                <span className="flex-row shop-item-title">{item.name}</span>

                <span className="flex-row shop-item-price">{buyPrice}</span>
            </div>
        </button>
    );
};

export default ShopItem;
