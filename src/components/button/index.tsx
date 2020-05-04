import React from 'react';

import EmptySlot from '../empty-slot';

import { SPRITE_PIXELS } from '../../constants';

import './styles.scss';

interface ButtonProps {
    icon?: string;
    title?: string;
    iconStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    indicator?: boolean;
    onClick?: () => void;
    small?: boolean;
    tiny?: boolean;
    image?: string;
    noBorder?: boolean;
    extraClass?: string;
}

const Button = (props: ButtonProps) => {
    function handleClick() {
        props.onClick && props.onClick();
    }

    return (
        <button
            className={`button-container ${props.noBorder ? '' : 'white-border'} ${
                props.small ? 'button-container-small' : props.tiny ? 'button-container-tiny' : ''
            } ${props.extraClass ? props.extraClass : ''}`}
            style={props.style || {}}
            onClick={handleClick}
        >
            {props.icon && (
                <i className={`fa fa-${props.icon} button-icon`} style={props.iconStyle || {}}>
                    {props.indicator && <div className="button-indicator" />}
                </i>
            )}
            {props.image && (
                <EmptySlot className="white-border button-image">
                    <div
                        style={{
                            backgroundImage: `url('${props.image}')`,
                            width: SPRITE_PIXELS,
                            height: SPRITE_PIXELS,
                        }}
                    />
                </EmptySlot>
            )}

            {props.title && <span>{props.title}</span>}
        </button>
    );
};

export default Button;
