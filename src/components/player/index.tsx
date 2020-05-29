import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import ReactTimeout, { ReactTimeoutProps } from "react-timeout";

import { RootState } from "../../store";
import { PlayerState } from "../../store/player/types";
import { StatsState } from "../../store/stats/types";

import { SPRITE_SIZE, ANIMATION_SPEED } from "../../constants";

import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

import { Animation } from "../animation";

import PlayerSprite from "./assets/knight_m_idle_anim_f0.png";
import SwordSlash from "./assets/sword-slash.png";
import MonsterSwordSlash from "./assets/monster-slash.png";

import "./styles.scss";
import { Direction } from "../../types";

interface StateProps {
    player: PlayerState;
    stats: StatsState;
}

type PlayerProps = StateProps & ReactTimeoutProps;

interface PlayerStateProps {
    attackAnimation: ReactNode;
    monsterAttackAnimation: ReactNode;
}

class Player extends Component<PlayerProps> {
    state: PlayerStateProps = {
        attackAnimation: undefined,
        monsterAttackAnimation: undefined,
    };

    componentDidUpdate(prevProps: PlayerProps): void {
        const { player: prevPlayer } = prevProps;
        const { player } = this.props;

        if (prevPlayer.monsterAttacked !== player.monsterAttacked) {
            let attackAnimation = undefined;

            if (player.monsterProjectile) {
                attackAnimation = (
                    <Animation
                        startPosition={player.monsterLocation}
                        endPosition={player.monsterTargetLocation}
                        projectile={player.monsterProjectile}
                        direction={player.monsterProjectileDirection}
                    />
                );
            } else {
                attackAnimation = (
                    <div
                        className="monster-slash"
                        style={{
                            backgroundImage: `url('${MonsterSwordSlash}')`,
                        }}
                    ></div>
                );
            }

            this.setState({
                monsterAttackAnimation: attackAnimation,
            });

            this.props.setTimeout &&
                this.props.setTimeout(
                    () =>
                        this.setState({
                            monsterAttackAnimation: undefined,
                        }),
                    ANIMATION_SPEED + 250,
                );
        } else if (prevPlayer.playerAttacked !== player.playerAttacked) {
            let attackAnimation = undefined;

            if (player.projectileUsed) {
                attackAnimation = (
                    <Animation
                        startPosition={player.position}
                        endPosition={player.targetLocation}
                        projectile={player.projectileUsed}
                        direction={player.direction}
                    />
                );
            } else {
                const position = { x: 0, y: 0 };
                switch (player.direction) {
                    case Direction.North:
                        position.y -= 1;
                        break;

                    case Direction.South:
                        position.y += 1;
                        break;

                    case Direction.East:
                        position.x += 1;
                        break;

                    case Direction.West:
                        position.x -= 1;
                        break;
                }

                const animationPosition = translateToSpriteCoordinates(position);

                attackAnimation = (
                    <div
                        className="player-slash"
                        style={{
                            backgroundImage: `url('${SwordSlash}')`,
                            top: animationPosition.y,
                            left: animationPosition.x,
                        }}
                    ></div>
                );
            }

            this.setState({
                attackAnimation: attackAnimation,
            });

            this.props.setTimeout &&
                this.props.setTimeout(
                    () =>
                        this.setState({
                            attackAnimation: undefined,
                        }),
                    ANIMATION_SPEED + 250,
                );
        }
    }

    render(): ReactNode {
        const { attackAnimation, monsterAttackAnimation } = this.state;

        const spriteCoordinates = translateToSpriteCoordinates(this.props.player.position);

        return (
            <div className="player-animation" style={{ top: spriteCoordinates.y, left: spriteCoordinates.x }}>
                <div
                    style={{
                        backgroundImage: `url('${PlayerSprite}')`,
                        zIndex: 100,
                        width: SPRITE_SIZE,
                        height: SPRITE_SIZE,
                    }}
                ></div>

                {attackAnimation}
                {monsterAttackAnimation}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): PlayerProps => ({
    player: state.player,
    stats: state.stats,
});

export default connect(mapStateToProps)(ReactTimeout(Player));
