import React, { FunctionComponent, ReactNode } from "react";

import { Tile, Point } from "../../types";

import Flame from "../flames";
import { SPRITE_SIZE } from "../../constants";
import { arrayContainsPoint } from "../../utils/array-contains";

export const getTileSprite = (type: number, variation: number): string => {
    switch (type) {
        case -2:
            return "chest-open";
        case -1:
            return "blood-splatter";
        case 0:
            return `floor_${variation}`;
        case 2:
            return "stairs-down";
        case 3:
            return "stairs-up";
        case 4:
            return "chest";
        case 5:
            return `brick-wall-${variation}`;
        case 6:
            return `ornate-wall-${variation}`;
        case 7:
            return `blue-wall-${variation}`;
        case 8:
            return `skull-wall-${variation}`;
        case 9:
            return "shop";
        case 10:
            return "shrine";
        default:
            return "";
    }
};

interface MapTileProps {
    tile: Tile;
    position: Point;
    sightBox: Point[];
}

const MapTile: FunctionComponent<MapTileProps> = (props: MapTileProps) => {
    // Load the tile directly from the public folder
    const tilesrc = `${process.env.PUBLIC_URL}/tiles/${getTileSprite(props.tile.value, props.tile.variation)}.png`;

    const inSight = arrayContainsPoint(props.sightBox, props.position);

    // case for rendering animated flame tile
    if (props.tile.value === 20) {
        return (
            <GroundTile variation={props.tile.variation}>
                <Flame position={props.position}>
                    <FogTile explored={props.tile.explored} inSight={inSight} />
                </Flame>
            </GroundTile>
        );
    }

    // case for rendering normal tiles
    return (
        <GroundTile variation={props.tile.variation}>
            <div
                style={{
                    backgroundImage: `url(${tilesrc})`,
                    height: SPRITE_SIZE,
                    width: SPRITE_SIZE,
                }}
            >
                <FogTile explored={props.tile.explored} inSight={inSight} />
            </div>
        </GroundTile>
    );
};

interface FogTileProps {
    inSight: boolean;
    explored: boolean;
}

export const FogTile: FunctionComponent<FogTileProps> = (props: FogTileProps) => {
    const opacity = !props.explored ? "1" : !props.inSight ? "0.5" : "0";

    return (
        <div
            style={{
                backgroundColor: "#000",
                opacity,
                display: "inline-flex",
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
                transition: "opacity .5s linear",
            }}
        />
    );
};

interface GroundTileProps {
    variation: number;
    children: ReactNode;
}

const GroundTile: FunctionComponent<GroundTileProps> = (props: GroundTileProps) => {
    // Load the tile directly from the public folder
    const tilesrc = `${process.env.PUBLIC_URL}/tiles/floor_${props.variation}.png`;

    return (
        <div
            style={{
                backgroundImage: `url(${tilesrc})`,
                display: "inline-flex",
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        >
            {props.children}
        </div>
    );
};

export default MapTile;
