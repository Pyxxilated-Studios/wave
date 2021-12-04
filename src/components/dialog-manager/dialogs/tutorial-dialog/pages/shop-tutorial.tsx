import { FunctionComponent } from "react";

import ShopKeeper from "../../../../shop-keeper";

import "./styles.scss";

const ShopPage: FunctionComponent = () => {
    return (
        <div className="flex-column tutorial-shop-container">
            <div className="tutorial-page-title">{"SHOPS"}</div>
            <div className={`flex-row`}>
                <ShopKeeper />
                <div className="tutorial-page-shop">
                    {"Shops are found on every second floor."}
                    <br />
                    <br />
                    {"Items are unlocked in tiers, dependent on player level."}
                    <br />
                </div>
            </div>
            <div className="tutorial-page-shop-tiers">
                {"Tier 1: Levels 1 -> 9"}
                <br />
                {"Tier 2: Levels 10 -> 19"}
                <br />
                {"Tier 3: Levels 20 -> 29"}
                <br />
                {"Tier 4: Levels 30 and above"}
                <br />
            </div>
        </div>
    );
};

export default ShopPage;
