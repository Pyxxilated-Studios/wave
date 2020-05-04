import React from 'react';
import { connect } from 'react-redux';

import { GAME_VIEWPORT_SIZE, GAME_VIEWPORT_SIZE_LARGE } from '../../constants';

import { RootState } from '../../store';
import { SystemState } from '../../store/system/types';

import './styles.scss';

interface ViewportProps {
    system: SystemState;
    children: React.ReactElement[] | React.ReactElement;
}

const Viewport = (props: ViewportProps) => {
    const { largeView, sideMenu } = props.system;

    const gameSize = largeView ? GAME_VIEWPORT_SIZE_LARGE : GAME_VIEWPORT_SIZE;
    const margin = sideMenu ? '8px 0 0' : '8px auto 0';

    const styles = {
        width: gameSize,
        height: gameSize,
        margin,
    };

    return (
        <div style={styles} className="viewport-container white-border">
            {props.children}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({ system: state.system });

export default connect(mapStateToProps)(Viewport);
