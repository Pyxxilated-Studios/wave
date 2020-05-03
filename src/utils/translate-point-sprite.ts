import { Point } from "../types";
import { SPRITE_SIZE } from "../constants";

export const translateToSpriteCoordinates = (point: Point): Point => ({
  x: point.x * SPRITE_SIZE,
  y: point.y * SPRITE_SIZE,
});

export const translateFromSpriteCoordinates = (point: Point): Point => ({
  x: point.x / SPRITE_SIZE,
  y: point.y / SPRITE_SIZE,
});
