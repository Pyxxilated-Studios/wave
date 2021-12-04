import { FunctionComponent, ReactElement } from "react";

import { getTileSprite, FogTile } from "./map-tile";
import { SPRITE_SIZE } from "../../constants";

import "./styles.scss";
import { PaddingTiles, Point, Tile } from "../../types";
import { arrayContainsPoint } from "../../utils/array-contains";

interface MapPaddingProps {
    tileType: number;
    tiles: PaddingTiles;
    sightBox: Point[];
}

type Padding = {
    top: ReactElement[];
    bottom: ReactElement[];
    left: ReactElement[];
    right: ReactElement[];
};

const MapPadding: FunctionComponent<MapPaddingProps> = (props: MapPaddingProps) => {
    const paddingTiles: Padding = {
        top: [],
        bottom: [],
        left: [],
        right: [],
    };

    Object.entries(props.tiles).forEach(([direction, tiles]) => {
        paddingTiles[direction as keyof Padding] = 
            tiles.map((row: Tile[], index: number) => {
                return (
                    <div className="row" style={{ height: SPRITE_SIZE }} key={`${direction}-${index}`}>
                        {row.map((rowTile) => {
                            return (
                                <BoundaryTile
                                    tileType={props.tileType}
                                    variation={rowTile.variation}
                                    explored={rowTile.explored}
                                    sightBox={props.sightBox}
                                    location={rowTile.location}
                                    key={JSON.stringify(rowTile.location)}
                                />
                            );
                        })}
                    </div>
                );
            });
    });

    // we need to mirror the top rows for them to
    // render properly with the player's sightbox
    paddingTiles.top.reverse();

    return (
        <>
            <div className="map-padding-top">{paddingTiles.top}</div>
            <div className="map-padding-bottom">{paddingTiles.bottom}</div>
            <div className="map-padding-left">{paddingTiles.left}</div>
            <div className="map-padding-right">{paddingTiles.right}</div>
        </>
    );
};

interface BoundaryTileProps {
    tileType: number;
    variation: number;
    explored: boolean;
    sightBox: Point[];
    location: Point;
}

const BoundaryTile: FunctionComponent<BoundaryTileProps> = (props: BoundaryTileProps) => {
    // Load the tile directly from the public folder
    const tilesrc = `/wave/tiles/${getTileSprite(props.tileType, props.variation)}.png`;

    // Check the sight box tiles
    const inSight = arrayContainsPoint(props.sightBox, props.location);

    return (
        <div
            style={{
                backgroundImage: `url(${tilesrc})`,
                display: "inline-flex",
                height: SPRITE_SIZE,
                width: SPRITE_SIZE,
            }}
        >
            <FogTile explored={props.explored} inSight={inSight} />
        </div>
    );
};

export default MapPadding;
