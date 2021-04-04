use wasm_bindgen::prelude::*;

use rand::prelude::*;

use std::ops::{Add, Div, Mul, Sub};

#[derive(Clone, Copy)]
enum BiasedTo {
    Max,
    Min,
}

struct Dice<'a>(Option<BiasedTo>, i32, &'a mut StdRng);

impl<'a> Iterator for Dice<'a> {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        Some(match self.0 {
            Some(BiasedTo::Max) => self.1,
            Some(BiasedTo::Min) => 1,
            None => self.2.gen_range(1, self.1),
        })
    }
}

#[derive(Clone, Copy, Debug)]
enum Operator {
    Plus,
    Minus,
    Divide,
    Multiply,
    Dice,
    Low,
    High,
    Explosion,
}

impl Operator {
    fn precedence(self) -> i32 {
        match self {
            Operator::Plus | Operator::Minus => 1,
            Operator::Multiply | Operator::Divide => 2,
            Operator::Low | Operator::High => 3,
            Operator::Dice => 4,
            Operator::Explosion => 5,
        }
    }

    fn operation(
        self,
        left: Token,
        right: Token,
        critical_hit: bool,
        bias: Option<BiasedTo>,
    ) -> Literal {
        use self::Literal::{Array, Number};
        use Token::Literal;

        let (l, r) = match (left, right) {
            (Literal(l), Literal(r)) => (l, r),
            _ => unreachable!(),
        };

        match self {
            Self::Plus => l + r,
            Self::Minus => l - r,
            Self::Multiply => l * r,
            Self::Divide => l / r,
            Self::Low => match l {
                Number(v) => Number(v),
                Array(mut a) => {
                    a.sort_unstable();
                    Array(a.into_iter().take(r.inner() as usize).collect())
                }
            },
            Self::High => match l {
                Number(v) => Number(v),
                Array(mut a) => {
                    a.sort_unstable_by(|a, b| b.cmp(a));
                    Array(a.into_iter().take(r.inner() as usize).collect())
                }
            },
            Self::Dice => {
                let sides = r.inner();
                let mul = if critical_hit {
                    2 * l.inner()
                } else {
                    l.inner()
                };

                let mut rng = StdRng::from_entropy();
                let dice = Dice(bias, sides, &mut rng);

                Array(dice.take(mul as usize).collect())
            }
            Self::Explosion => {
                let sides = r.inner();
                let mul = if critical_hit {
                    2 * l.inner()
                } else {
                    l.inner()
                };

                let mut rng = StdRng::from_entropy();
                let dice = Dice(bias, sides, &mut rng);

                Array(dice.take(mul as usize).collect())
            }
        }
    }
}

#[derive(Clone, Debug)]
enum Literal {
    Number(i32),
    Array(Vec<i32>),
}

impl Literal {
    fn inner(&self) -> i32 {
        match self {
            Self::Number(v) => *v,
            Self::Array(a) => a.iter().sum(),
        }
    }
}

impl Add for Literal {
    type Output = Self;

    fn add(self, rhs: Self) -> Self::Output {
        Self::Number(self.inner() + rhs.inner())
    }
}

impl Sub for Literal {
    type Output = Self;

    fn sub(self, rhs: Self) -> Self::Output {
        Self::Number(self.inner() - rhs.inner())
    }
}

impl Mul for Literal {
    type Output = Self;

    fn mul(self, rhs: Self) -> Self::Output {
        Self::Number(self.inner() * rhs.inner())
    }
}

impl Div for Literal {
    type Output = Self;

    fn div(self, rhs: Self) -> Self::Output {
        Self::Number(self.inner() / rhs.inner())
    }
}

#[derive(Clone, Debug)]
enum Token {
    Operator(Operator),
    LeftParen,
    RightParen,
    Literal(Literal),
}

trait Lex {
    type Output;
    fn lex(self) -> Result<Self::Output, String>;
}

impl Lex for &str {
    type Output = Vec<Token>;

    fn lex(self) -> Result<Self::Output, String> {
        use self::Literal::Number;
        use self::Operator::{Dice, Divide, Explosion, High, Low, Minus, Multiply, Plus};
        use Token::{LeftParen, Literal, Operator, RightParen};

        let mut output = Vec::new();
        let mut expression = self.chars().peekable();

        while let Some(ch) = expression.peek() {
            let token = match ch {
                'd' => {
                    // Ensure that something like 'd4' works as expected
                    match output.last() {
                        Some(Some(Literal(_))) => {}
                        _ => output.push(Some(Literal(Number(1)))),
                    };
                    Some(Operator(Dice))
                }
                // '!' => Some(Operator(Explosion)),
                'l' => Some(Operator(Low)),
                'h' => Some(Operator(High)),
                '-' => Some(Operator(Minus)),
                '+' => Some(Operator(Plus)),
                '*' => Some(Operator(Multiply)),
                '/' => Some(Operator(Divide)),
                '(' => Some(LeftParen),
                ')' => Some(RightParen),
                '0'..='9' => {
                    let mut num = String::new();

                    while let Some(ch) = expression.peek() {
                        if !ch.is_digit(10) {
                            break;
                        }

                        num.push(expression.next().unwrap());
                    }

                    Some(Literal(Number(num.parse().unwrap())))
                }
                c if c.is_whitespace() => None,
                _ => return Err(format!("Unknown character {}", ch)),
            };

            output.push(token);

            match output.last().unwrap() {
                Some(Literal(_)) => {}
                _ => {
                    expression.next();
                }
            };
        }

        Ok(output.into_iter().flatten().collect())
    }
}

fn reorder(stack: &mut Vec<Token>, operator: Operator, output: &mut Vec<Token>) {
    while let Some(Token::Operator(op)) = stack.last() {
        if operator.precedence() > op.precedence() {
            break;
        }

        output.push(stack.pop().unwrap());
    }
}

fn yard(infix: &[Token]) -> Vec<Token> {
    use Token::{LeftParen, Literal, Operator, RightParen};

    let (output, stack) = infix.iter().fold(
        (Vec::new(), Vec::new()),
        |(mut output, mut stack), token| {
            match token {
                Operator(op) => {
                    reorder(&mut stack, *op, &mut output);
                    stack.push(token.clone())
                }
                LeftParen => stack.push(token.clone()),
                RightParen => {
                    while let Some(t) = stack.last() {
                        if let LeftParen = t {
                            break;
                        }

                        output.push(stack.pop().unwrap());
                    }

                    stack.pop();
                }
                Literal(_) => output.push(token.clone()),
            };

            (output, stack)
        },
    );

    output.into_iter().chain(stack).collect()
}

fn rpn(postfix: &[Token], critical_hit: bool, bias: Option<BiasedTo>) -> Result<i32, String> {
    use self::Literal::{Array, Number};
    use Token::Literal;

    let evaluated = postfix
        .iter()
        .try_fold(Vec::new(), |mut stack, token| {
            match token {
                Token::Operator(op) => {
                    let right = match stack.pop() {
                        Some(token) => match token {
                            Literal(_) => token,
                            _ => return Err(String::from("Invalid expression")),
                        },
                        None => return Err(String::from("Invalid expression")),
                    };

                    let left = match stack.pop() {
                        Some(token) => match token {
                            Literal(_) => token,
                            _ => return Err(String::from("Invalid expression")),
                        },
                        None => return Err(String::from("Invalid expression")),
                    };

                    stack.push(Literal(op.operation(left, right, critical_hit, bias)));
                }
                Literal(_) => stack.push(token.clone()),
                _ => return Err(format!("Expected Operator or Literal, found {:#?}", token)),
            }

            Ok(stack)
        })?
        .pop();

    match evaluated.unwrap_or(Literal(Number(0))) {
        Literal(Number(v)) => Ok(v),
        Literal(Array(a)) => Ok(a.iter().sum()),
        _ => Err(String::from("Invalid expression")),
    }
}

fn parse(notation: &str, critical_hit: bool, bias: Option<BiasedTo>) -> Result<i32, String> {
    rpn(&yard(&notation.lex()?), critical_hit, bias)
}

#[wasm_bindgen]
pub fn roll(notation: &str, critical_hit: bool) -> Result<i32, JsValue> {
    parse(notation, critical_hit, None).map_err(|err| JsValue::from_str(&err))
}

#[wasm_bindgen]
pub fn calculate_damage_range(notation: &str, critical_hit: bool) -> Result<Vec<i32>, JsValue> {
    let postfix = yard(&notation.lex()?);

    let min = rpn(&postfix, critical_hit, Some(BiasedTo::Min))?;
    let max = rpn(&postfix, critical_hit, Some(BiasedTo::Max))?;

    Ok(vec![min, max])
}

#[test]
fn dice_parse() {
    assert_eq!(Ok(12), parse("3 * (d4 + 3)", false, Some(BiasedTo::Min)));
    assert_eq!(Ok(21), parse("3 * (d4 + 3)", false, Some(BiasedTo::Max)));

    assert_eq!(Ok(15), parse("3 * (2d4 + 3)", false, Some(BiasedTo::Min)));
    assert_eq!(Ok(33), parse("3 * (2d4 + 3)", false, Some(BiasedTo::Max)));
}

#[test]
fn dice_errors() {
    assert_eq!(
        Err(String::from("Unknown character x")),
        parse("3dx", false, None)
    );

    assert_eq!(
        Err(String::from("Invalid expression")),
        parse("3 * *", false, None)
    );
}
