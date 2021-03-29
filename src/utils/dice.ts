import { calculate_damage_range, roll } from "wave";

export const calculateDamageRange = (notation: string, criticalHit: boolean): [number, number] => {
    const range = calculate_damage_range(notation, criticalHit);
    const [min, max] = range;
    return [min, max];
};

String.prototype.roll = function (this: string, criticalHit: boolean): number {
    return roll(this, criticalHit);
};

/**
 * A standard 20 sided dice roll
 */
export const d20 = (): number => Math.floor(Math.random() * 20) + 1;
