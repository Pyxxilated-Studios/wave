import React, { CSSProperties, FunctionComponent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import Button from "../button";

// import './styles.scss';

interface SelectButtonProps {
    icon?: IconProp;
    title: string;
    iconStyle?: CSSProperties;
    style?: CSSProperties;
    indicator?: boolean;
    onClick?: (_: string) => void;
    small?: boolean;
    tiny?: boolean;
    image?: string;
    noBorder?: boolean;
    extraClass?: string;
    selected: boolean;
}

const SelectButton: FunctionComponent<SelectButtonProps> = (props: SelectButtonProps) => {
    function handleClick(): void {
        if (props.onClick) {
            props.onClick(props.title);
        }
    }

    return (
        <Button
            title={props.title}
            extraClass={`select-button ${props.selected ? "selected " : ""}
                ${props.extraClass ? props.extraClass : ""}`}
            onClick={handleClick}
            icon={props.icon}
            iconStyle={props.iconStyle}
            indicator={props.indicator}
            small={props.small}
            tiny={props.tiny}
            noBorder={props.noBorder}
        />
    );
};

export default SelectButton;
