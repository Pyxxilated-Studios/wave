export interface Point {
  x: number;
  y: number;
}

export interface Tile {
  location: Point;
  value: number;
  explored: boolean;
  variation: number;
}

export enum Direction {
  North,
  South,
  East,
  West,
}

export interface PaddingTiles {
  top: Tile[][];
  bottom: Tile[][];
  left: Tile[][];
  right: Tile[][];
}

export interface GameMap {
  id: string;
  tiles: Tile[][];
  paddingTiles: PaddingTiles;
}
