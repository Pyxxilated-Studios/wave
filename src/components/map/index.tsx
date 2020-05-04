import React from 'react';
import { connect } from 'react-redux';

import { MapState } from '../../store/map/types';
import { WorldState } from '../../store/world/types';
import { RootState } from '../../store';
import { Tile, Point } from '../../types';
import { MAP_SIZE, SPRITE_SIZE } from '../../constants';

import MapTile from './map-tile';
import MapPadding from './map-padding';

interface MapProps {
    map: MapState;
    world: WorldState;
}

const Map = (props: MapProps) => {
    const { randomMaps, currentMap, floorNumber } = props.world;

    const width = MAP_SIZE.width * SPRITE_SIZE;
    const height = MAP_SIZE.height * SPRITE_SIZE;

    const map = { ...props.map, ...randomMaps[floorNumber - 1] };

    const mapStyle: React.CSSProperties = { width, height, position: 'relative' };

    if (!currentMap) return <div style={mapStyle} />;

    const wallType = getWallType(map.tiles);

    return (
        <div style={mapStyle}>
            <MapPadding tileType={wallType} tiles={map.paddingTiles} sightBox={map.paddingSightBox} />

            {map.tiles.map((row, index) => {
                return <MapRow tiles={row} index={index} sightBox={map.sightBox} key={JSON.stringify(row) + index} />;
            })}
        </div>
    );
};

interface MapRowProps {
    tiles: Tile[];
    index: number;
    sightBox: Point[];
}

const MapRow = (props: MapRowProps) => {
    return (
        <div className="row" style={{ height: SPRITE_SIZE }}>
            {props.tiles.map((tile, index) => {
                return (
                    <MapTile
                        tile={tile}
                        position={{ x: index, y: props.index }}
                        sightBox={props.sightBox}
                        key={JSON.stringify(tile) + index}
                    />
                );
            })}
        </div>
    );
};

const getWallType = (tiles: Tile[][]): number => {
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j].value >= 5 && tiles[i][j].value <= 8) return tiles[i][j].value;
        }
    }

    return 0;
};

const mapStateToProps = (state: RootState) => ({
    map: state.map,
    world: state.world,
});

export default connect(mapStateToProps)(Map);
