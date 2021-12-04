import { ReactNode } from "react";

import { Item, Weapon } from "../types";

export const getContext = (item: Item): ReactNode => {
    return (
        <div>
            <span>{item.name}</span>
            <br />
            <span>{item.type}</span>
            <br />
            {item.effects &&
                Object.entries(item.effects).map(([effect, value]) => (
                    <div key={`${effect}-${value}`}>
                        <span>
                            {effect}: <span style={{ color: "green" }}>{value}</span>
                        </span>
                        <br />
                    </div>
                ))}
            {item.type === "weapon" && (
                <span>
                    Damage: <span style={{ color: "red" }}>{(item as Weapon).damage}</span>
                </span>
            )}
        </div>
    );
};
