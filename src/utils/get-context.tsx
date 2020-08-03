import React, { ReactNode } from "react";

import { Item, Weapon } from "../types";

export const getContext = (item: Item): ReactNode => {
    return (
        <>
            <span>{item.name}</span>
            <br />
            <span>{item.type}</span>
            <br />
            {item.effects &&
                Object.entries(item.effects).map(([effect, value]) => (
                    <>
                        <span key={effect}>
                            {effect}: <span style={{ color: "green" }}>{value}</span>
                        </span>
                        <br />
                    </>
                ))}
            {item.type === "weapon" && (
                <span>
                    Damage: <span style={{ color: "red" }}>{(item as Weapon).damage}</span>
                </span>
            )}
        </>
    );
};
