import { Point } from "../types";

// Create the chest's name given it's position
export const getChestName = (map: string, position: Point): string => map + "(" + position.x + "," + position.y + ")";
