// Create an 'unbiased' roll
const unbiased = (sides: number): number =>
  Math.floor(Math.random() * sides) + 1;

// Create a 'biased' dice roll, either to the maximum or the minimum value, if not specified, return an unbiased roll
const biased = (to: string) => {
  if (to === "max") {
    return (sides: number): number => sides;
  } else if (to === "min") {
    return (_: number): number => 1;
  }
  return unbiased;
};

const ops = {
  "+": {
    precedence: 1,
    op: (left: any, right: any, _: typeof unbiased) => {
      if (Array.isArray(left)) {
        left = left.reduce((sum, value) => sum + value);
      }
      if (Array.isArray(right)) {
        right = right.reduce((sum, value) => sum + value);
      }
      return parseInt(left) + parseInt(right);
    },
  },
  "-": {
    precedence: 1,
    op: (left: any, right: any, _: typeof unbiased) => {
      if (Array.isArray(left)) {
        left = left.reduce((sum, value) => sum + value);
      }
      if (Array.isArray(right)) {
        right = right.reduce((sum, value) => sum + value);
      }
      return parseInt(left) - parseInt(right);
    },
  },
  "*": {
    precedence: 2,
    op: (left: any, right: any, _: typeof unbiased) => {
      if (Array.isArray(left)) {
        left = left.reduce((sum, value) => sum + value);
      }
      if (Array.isArray(right)) {
        right = right.reduce((sum, value) => sum + value);
      }
      return parseInt(left) * parseInt(right);
    },
  },
  "/": {
    precedence: 2,
    op: (left: any, right: any, _: typeof unbiased) => {
      if (Array.isArray(left)) {
        left = left.reduce((sum, value) => sum + value);
      }
      if (Array.isArray(right)) {
        right = right.reduce((sum, value) => sum + value);
      }
      return parseInt(left) / parseInt(right);
    },
  },
  l: {
    precedence: 3,
    op: (left: any, right: any, _: typeof unbiased) => {
      // Remove the lowest `right` number of rolls
      return left.sort().splice(right);
    },
  },
  h: {
    precedence: 3,
    op: (left: any, right: any, _: typeof unbiased) => {
      // Select the highest `right` number of rolls
      return left.sort((l: any, r: any) => r - l).splice(right);
    },
  },
  d: {
    precedence: 4,
    op: (left: any, right: any, die: any) => {
      const mul = parseInt(left);
      const sides = parseInt(right);
      const rolls = [];

      for (let i = 0; i < mul; i++) {
        rolls.push(die(sides));
      }

      return rolls;
    },
  },
};

const peek = (a: any[]): string => a[a.length - 1];

const reorder = (stack: any[], token: string, out: any[]) => {
  while (
    peek(stack) in ops &&
    Reflect.get(ops, token).precedence <=
      Reflect.get(ops, peek(stack)).precedence
  ) {
    out.push(stack.pop());
  }
};

const isNumber = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i);
    if (ch < "0" || ch > "9") {
      return false;
    }
  }

  return true;
};

const lex = (expression: string) => {
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

// Djikstra's shunting yard algorithm to convert infix notation to postfix notation
const yard = (infix: string) => {
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

// Evaluate a reverse polish notation (postfix) expression
const rpn = (postfix: string, die: typeof unbiased) => {
  const evaluated: string[] | string[][] = postfix
    .split(" ")
    .reduce((stack: string[], token: string) => {
      if (token in ops) {
        const right = stack.pop();
        const left = stack.pop();
        stack.push(Reflect.get(ops, token).op(left, right, die));
      } else {
        stack.push(token);
      }

      return stack;
    }, []);

  const ev = evaluated.pop();
  const out = ev ? ev : "";

  return Array.isArray(out) // We can either get a value here, or an array (indicating the last item is a dice roll)
    ? out.reduce((sum, value) => sum + value, 0)
    : out;
};

const parse = (notation: string, dice: typeof unbiased) =>
  rpn(yard(lex(notation)), dice);

export const calculateDamageRange = (notation: string) => {
  const min = parse(notation, biased("min"));
  const max = parse(notation, biased("max"));
  return [min, max];
};

// Calculates damage to deal based on Dice Notation (https://en.wikipedia.org/wiki/Dice_notation)
export const calculateDamage = (notation: string) => parse(notation, unbiased);

export const d20 = () => Math.floor(Math.random() * 20) + 1;
