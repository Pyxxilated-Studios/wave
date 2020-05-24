import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { StatsState } from "../../store/stats/types";
import { InventoryState } from "../../store/inventory/types";

import { ItemType } from "../../types";
import { MAX_ITEMS_UPGRADE } from "../../constants";

import calculateModifier from "../../utils/calculate-modifier";

import ShopItem from "./shop-item";
import shopItems from "./shop-items";
import ViewItem from "../view-item";

import "./styles.scss";
import Button from "../button";
import { RootState } from "../../store";

const ITEMS_PER_PAGE = 5;

interface ShopInventoryState {
    stats: StatsState;
    inventory: InventoryState;
}

type ShopInventoryProps = ShopInventoryState;

const ShopInventory: FunctionComponent<ShopInventoryProps> = (props: ShopInventoryProps) => {
    const { inventory, stats } = props;

    const [buyItem, setBuyItem] = useState<ItemType>();
    const [page, setPage] = useState(0);

    // render the shop's items
    const shopInventoryItems = shopItems(stats.level)
        .filter((item) => {
            return item.type !== "backpack" || inventory.maxItems !== MAX_ITEMS_UPGRADE;
        })
        .map((item) => (
            <ShopItem
                key={uuidv4()}
                item={item}
                buyItem={(): void => setBuyItem(item)}
                charismaModifier={calculateModifier(stats.abilities.charisma)}
            />
        ));

    const MAX_PAGE = Math.ceil(shopInventoryItems.length / ITEMS_PER_PAGE) - 1;

    const decrementPage = (): void => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const incrementPage = () => {
        if (page < MAX_PAGE) {
            setPage(page + 1);
        }
    };

    return (
        <div className="flex-column shop-inventory-container">
            <ViewItem open={Boolean(buyItem)} buy={true} data={buyItem} onClose={(): void => setBuyItem(undefined)} />

            {shopInventoryItems.splice(5 * page, ITEMS_PER_PAGE)}

            <div className="flex-row space-between">
                {page > 0 ? (
                    <Button
                        extraClass="shop-inventory-button"
                        onClick={decrementPage}
                        title="previous"
                        icon="arrow-left"
                        iconStyle={{ paddingRight: 15 }}
                    />
                ) : (
                    <div />
                )}
                {page < MAX_PAGE ? (
                    <Button
                        extraClass="shop-inventory-button"
                        onClick={incrementPage}
                        title="next"
                        icon="arrow-right"
                        iconStyle={{ paddingLeft: 15 }}
                    />
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): ShopInventoryState => ({ inventory: state.inventory, stats: state.stats });

export default connect(mapStateToProps)(ShopInventory);
