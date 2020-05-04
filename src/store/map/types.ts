import { Point } from '../../types';
import { ResetAction } from '../system/types';

export interface MapState {
    sightBox: Point[];
    paddingSightBox: Point[];
}

export const EXPLORE_TILES = 'EXPLORE_TILES';
export interface ExploreTilesAction {
    type: typeof EXPLORE_TILES;
    tiles: Point[];
    paddingTiles: Point[];
}

export type MapActionType = ExploreTilesAction | ResetAction;
