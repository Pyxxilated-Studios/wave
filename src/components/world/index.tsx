import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import ReactTimeout, { ReactTimeoutProps } from "react-timeout";

import { RootState, RootDispatch } from "../../store";
import { WorldState } from "../../store/world/types";
import { PlayerState } from "../../store/player/types";
import { DialogState } from "../../store/dialog/types";

import { Point } from "../../types";
import { MAP_TRANSITION_DELAY, SPRITE_SIZE } from "../../constants";

import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

import { exploreTiles } from "../../store/map/actions";

import { takeMonstersTurn } from "../monsters/actions/take-monsters-turn";
import loadMonsters from "../monsters/actions/load-monsters";

import Controls from "../controls";
import Map from "../map";
import Monsters from "../monsters";
import Player from "../player";

import "./styles.scss";

interface OwnProps {
    library: typeof import("wave");
}

interface DispatchProps {
    takeMonstersTurn: () => void;
    loadMonsters: () => void;
    exploreTiles: (position: Point) => void;
}

interface StateProps {
    world: WorldState;
    player: PlayerState;
    dialog: DialogState;
}

type WorldProps = OwnProps & DispatchProps & StateProps & ReactTimeoutProps;

// animation time is 500(ms), adding +100 makes it smoother
const MAP_TRANSITION = MAP_TRANSITION_DELAY + 100;

type State = {
    opacity: number;
};

class World extends Component<WorldProps, State> {
    state: State = {
        opacity: 0,
    };

    componentDidUpdate(prevProps: WorldProps): void {
        // reload the tiles and monsters if it's a new map
        // and there is a current map
        // and it's not the game start
        if (
            prevProps.world.mapTransition !== this.props.world.mapTransition &&
            prevProps.world.currentMap !== null &&
            this.props.dialog.reason.gameStart !== true
        ) {
            this.handleMapTransition();
        }
        // if a turn has been taken, and the game hasn't just restarted, and the map didn't change
        else if (
            prevProps.world.turn !== this.props.world.turn &&
            this.props.world.turn !== 0 &&
            prevProps.world.currentMap === this.props.world.currentMap
        ) {
            // take monster turn
            this.props.takeMonstersTurn();
        }
    }

    handleMapTransition(): void {
        const { player } = this.props;
        // fade the map transition component to black
        this.setState({ opacity: 1 }, () => {
            // after a delay, fade the map transition with the new map loaded
            this.props.setTimeout &&
                this.props.setTimeout(() => {
                    this.props.exploreTiles(player.position);
                    this.props.loadMonsters();
                    this.setState({ opacity: 0 });
                }, MAP_TRANSITION);
        });
    }

    render(): ReactNode {
        const { opacity } = this.state;
        const { player, dialog } = this.props;

        const playerSpriteCoordinates = translateToSpriteCoordinates(player.position);

        return (
            <>
                <div
                    className="world-container"
                    style={{
                        top: `calc(50% - ${playerSpriteCoordinates.y}px - ${SPRITE_SIZE / 2}px)`,
                        left: `calc(50% - ${playerSpriteCoordinates.x}px - ${SPRITE_SIZE / 2}px)`,
                    }}
                >
                    <Controls />

                    <Map />

                    <Player />

                    <Monsters />
                </div>

                <div
                    className="world-map-transition"
                    style={{ opacity: player.playerDied || !dialog.reason.gameRunning ? 1 : opacity }}
                />
            </>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    world: state.world,
    player: state.player,
    dialog: state.dialog,
});

const mapDispatchToProps = (dispatch: RootDispatch): DispatchProps => {
    const actions = {
        takeMonstersTurn: (): void => dispatch(takeMonstersTurn()),
        loadMonsters: (): void => dispatch(loadMonsters()),
        exploreTiles: (position: Point): void => dispatch(exploreTiles(position)),
    };
    return actions;
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(World));
