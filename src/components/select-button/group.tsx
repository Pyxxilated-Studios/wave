import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import SelectButton from "./index";

interface SelectButtonGroupProps {
    values: string[];
    select: (_: string) => boolean;
    icon?: IconProp;
    title?: string;
    iconStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    indicator?: boolean;
    onClick?: (_: string) => void;
    small?: boolean;
    tiny?: boolean;
    image?: string;
    noBorder?: boolean;
    extraClass?: string;
}

const SelectButtonGroup: React.FunctionComponent<SelectButtonGroupProps> = (props: SelectButtonGroupProps) => {
    return (
        <>
            {props.values.map((value) => (
                <SelectButton
                    key={value}
                    title={value}
                    selected={props.select(value)}
                    onClick={props.onClick}
                    extraClass={props.extraClass}
                    icon={props.icon}
                    iconStyle={props.iconStyle}
                    indicator={props.indicator}
                    small={props.small}
                    tiny={props.tiny}
                    noBorder={props.noBorder}
                />
            ))}
        </>
    );
};

export default SelectButtonGroup;
