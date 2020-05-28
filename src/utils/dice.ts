/**
 * An 'unbiased' dice roll
 *
 * @param sides The number of sides the dice has
 */
const unbiased = (sides: number): number => Math.floor(Math.random() * sides) + 1;
type DiceType = typeof unbiased;

type BiasedDice = "min" | "max";

/**
 * Create a 'biased' dice roll, either to the maximum or the minimum value.
 * If not specified, or it's not biased to either max or min, return an unbiased roll
 *
 * @param to The bias we want to represent (max or min)
 */
const biased = (to: BiasedDice): DiceType => {
    if (to === "max") {
        return (sides: number): number => sides;
    } else if (to === "min") {
        return (): number => 1;
    }
    return unbiased;
};

type operand = string | string[];

const ops = {
    "+": {
        precedence: 1,
        op: (left: operand, right: operand): number => {
            const _left = Array.isArray(left) ? left.reduce((sum, value) => sum + value) : left;
            const _right = Array.isArray(right) ? right.reduce((sum, value) => sum + value) : right;

            return parseInt(_left) + parseInt(_right);
        },
    },
    "-": {
        precedence: 1,
        op: (left: operand, right: operand): number => {
            const _left = Array.isArray(left) ? left.reduce((sum, value) => sum + value) : left;
            const _right = Array.isArray(right) ? right.reduce((sum, value) => sum + value) : right;

            return parseInt(_left) - parseInt(_right);
        },
    },
    "*": {
        precedence: 2,
        op: (left: operand, right: operand): number => {
            const _left = Array.isArray(left) ? left.reduce((sum, value) => sum + value) : left;
            const _right = Array.isArray(right) ? right.reduce((sum, value) => sum + value) : right;

            return parseInt(_left) * parseInt(_right);
        },
    },
    "/": {
        precedence: 2,
        op: (left: operand, right: operand): number => {
            const _left = Array.isArray(left) ? left.reduce((sum, value) => sum + value) : left;
            const _right = Array.isArray(right) ? right.reduce((sum, value) => sum + value) : right;

            return parseInt(_left) / parseInt(_right);
        },
    },
    l: {
        precedence: 3,
        op: (left: number[], right: number): number[] => {
            // Remove the lowest `right` number of rolls
            return left.sort().splice(right);
        },
    },
    h: {
        precedence: 3,
        op: (left: number[], right: number): number[] => {
            // Select the highest `right` number of rolls
            return left.sort((l: number, r: number) => r - l).splice(right);
        },
    },
    d: {
        precedence: 4,
        op: (left: string, right: string, criticalHit: boolean, die: DiceType): number[] => {
            const mul = parseInt(left) * (criticalHit ? 2 : 1);
            const sides = parseInt(right);
            const rolls = [];

            for (let i = 0; i < mul; i++) {
                rolls.push(die(sides));
            }

            return rolls;
        },
    },
};

/**
 * Take a peek at the last element of an array
 *
 * @param arr The array to peek into
 */
const peek = (a: string[]): string => a[a.length - 1];

/**
 * Reorder an array so that the precedence of operators is taken into account
 *
 * @param stack The stack to reorder
 * @param token The token (operator) we're trying to insert
 * @param out Where to put the resulting ordered operators
 */
const reorder = (stack: string[], token: string, out: string[]): void => {
    while (peek(stack) in ops && Reflect.get(ops, token).precedence <= Reflect.get(ops, peek(stack)).precedence) {
        const top = stack.pop();
        if (top) {
            out.push(top);
        }
    }
};

/**
 * Determine if a string is a base 10 number
 *
 * @param str The string to check
 */
const isNumber = (str: string): boolean => {
    for (let i = 0; i < str.length; i++) {
        const ch = str.charAt(i);
        if (ch < "0" || ch > "9") {
            return false;
        }
    }

    return true;
};

/**
 * Lex an expression (dice notation) into it's components
 *
 * @param expression The expression (given as dice notation) to lex
 */
const lex = (expression: string): string => {
    return expression
        .split("")
        .reduce((output: string[], token: string) => {
            if (token in ops) {
                output.push(token);
            } else if (token === "(" || token === ")") {
                output.push(token);
            } else if (token.trim().length > 0) {
                if (output.length > 0 && isNumber(output[output.length - 1])) {
                    output.push(output.pop() + token);
                } else {
                    output.push(token);
                }
            }

            return output;
        }, [])
        .join(" ");
};

/**
 * An implementation of Djikstra's shunting yard algorithm (https://en.wikipedia.org/wiki/Shunting-yard_algorithm)
 * modified to account for the peculiarities around dice notation
 *
 * @param infix The expression to convert to postfix notation for evaluating
 */
const yard = (infix: string): string => {
    const stack: string[] = [];

    return infix
        .split(" ")
        .reduce((output: string[], token) => {
            if (token in ops) {
                reorder(stack, token, output);
                stack.push(token);
            } else if (token === "(") {
                stack.push(token);
            } else if (token === ")") {
                while (peek(stack) !== "(") {
                    const next = stack.pop();
                    if (next) {
                        output.push(next);
                    }
                }

                stack.pop();
            } else if (isNumber(token)) {
                // It's just a number, so put it to the output
                output.push(token);
            } else if (token.includes("d")) {
                // We have a dice throw
                const tokens = token.split("d");

                // This is the multiplier, so push it to the output
                output.push(tokens[0]);
                reorder(stack, "d", output);
                stack.push("d");

                const selector = tokens[1].includes("l")
                    ? "l" // Remove the lowest n throws
                    : tokens[1].includes("h")
                    ? "h" // Take the highest n throws
                    : null;

                if (selector !== null) {
                    const selected = tokens[1].split(selector);
                    // Push the sides of the dice regardless
                    output.push(selected[0]);

                    reorder(stack, selector, output);
                    stack.push(selector);
                    output.push(selected[1]);
                } else {
                    // No selector, just the sides left
                    output.push(tokens[1]);
                }
            }

            return output;
        }, [])
        .concat(stack.reverse())
        .join(" ");
};

/**
 * Evaluate a dice notation given in postfix notation
 *
 * @param postfix The notation to parse
 * @param criticalHit Whether or not the roll was a critical hit
 * @param die The dice function to use to 'roll' a dice
 */
const rpn = (postfix: string, criticalHit: boolean, die: DiceType): number => {
    const evaluated: string[] | string[][] = postfix.split(" ").reduce((stack: string[], token: string) => {
        if (token in ops) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(Reflect.get(ops, token).op(left, right, criticalHit, die));
        } else {
            stack.push(token);
        }

        return stack;
    }, []);

    const ev = evaluated.pop() || "0";

    return Array.isArray(ev) // We can either get a value here, or an array (indicating the last item is a dice roll)
        ? ev.reduce((sum, value) => sum + value, 0)
        : parseInt(ev, 10);
};

/**
 * Parse a dice's notation. Based on the notation given at https://en.wikipedia.org/wiki/Dice_notation
 *
 * @param notation The notation to parse
 * @param criticalHit Whether or not the dice was a critical hit
 * @param dice The dice function to use (useful for determining range)
 */
const parse = (notation: string, criticalHit: boolean, dice: DiceType): number =>
    rpn(yard(lex(notation)), criticalHit, dice);

export const calculateDamageRange = (notation: string, criticalHit: boolean): [number, number] => {
    const min = parse(notation, criticalHit, biased("min"));
    const max = parse(notation, criticalHit, biased("max"));
    return [min, max];
};

/**
 * Determine the damage done given the notation and whether or not the roll is a critical hit
 *
 * @param notation The dice notation we want to calculate
 * @param criticalHit Whether the roll was a critical hit
 *
 *
 */
/* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
String.prototype.roll = function (this: string, criticalHit: boolean): number {
    return parse(this, criticalHit, unbiased);
};

/**
 * A standard 20 sided dice roll
 */
export const d20 = (): number => Math.floor(Math.random() * 20) + 1;
