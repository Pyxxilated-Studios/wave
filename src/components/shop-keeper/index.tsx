import React, { FunctionComponent } from "react";

import ShopKeepSprite from "./shop-keep.png";

import "./styles.scss";

const ShopKeeper: FunctionComponent = () => {
    return <div className="shop-keep-animated" style={{ backgroundImage: `url(${ShopKeepSprite})` }} />;
};

export default ShopKeeper;
