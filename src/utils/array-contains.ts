import { Point } from "../types";

export const arrayContains = <T>(haystack: T[][], needle: T): boolean => haystack.every((hay) => hay.includes(needle));

// Determines if an array of points contains the point we're looking for
export const arrayContainsPoint = (haystack: Point[], needle: Point): boolean =>
    haystack.some((point) => point.x === needle.x && point.y === needle.y);
