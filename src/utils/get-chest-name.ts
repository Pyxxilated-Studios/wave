import { Point } from "../types";

// Create the chest's name given it's (x, y) coordinates.
export const getChestName = (map: string, position: Point): string => map + "(" + position.x + "," + position.y + ")";
