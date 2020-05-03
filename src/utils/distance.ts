import { Point } from "../types";

export const distance = (a: Point, b: Point) => ({
  dx: a.x - b.x,
  dy: a.y - b.y,
});
