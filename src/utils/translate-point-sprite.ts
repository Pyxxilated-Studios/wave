import { Point } from "../types";
import { SPRITE_SIZE } from "../constants";

export const translateToSpriteCoordinates = (point: Point): Point =>
    new Point(point.x * SPRITE_SIZE, point.y * SPRITE_SIZE);

export const translateFromSpriteCoordinates = (point: Point): Point =>
    new Point(point.x / SPRITE_SIZE, point.y / SPRITE_SIZE);
