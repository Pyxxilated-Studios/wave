use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use js_sys::Array;

use rand::distributions::Standard;
use rand::prelude::*;

use std::cmp::{max, min};

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(typescript_type = "Tile[][]")]
    pub type Map;
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct Point {
    x: i64,
    y: i64,
}

#[wasm_bindgen]
impl Point {
    pub fn x(&self) -> i64 {
        self.x
    }

    pub fn y(&self) -> i64 {
        self.y
    }
}

pub struct Rect {
    pub x1: i32,
    pub x2: i32,
    pub y1: i32,
    pub y2: i32,
}

impl Rect {
    pub fn new(x: i32, y: i32, w: i32, h: i32) -> Self {
        Self {
            x1: x,
            y1: y,
            x2: x + w,
            y2: y + h,
        }
    }

    // Returns true if this overlaps with other
    pub fn intersect(&self, other: &Self) -> bool {
        self.x1 <= other.x2 && self.x2 >= other.x1 && self.y1 <= other.y2 && self.y2 >= other.y1
    }

    pub fn center(&self) -> (i32, i32) {
        ((self.x1 + self.x2) / 2, (self.y1 + self.y2) / 2)
    }
}

#[wasm_bindgen]
struct Tile {
    location: Point,
    explored: bool,
    value: i64,
    variation: i64,
}

#[wasm_bindgen]
impl Tile {
    pub fn location(&self) -> Point {
        self.location.clone()
    }

    pub fn explored(&self) -> bool {
        self.explored
    }

    pub fn value(&self) -> i64 {
        self.value
    }

    pub fn variation(&self) -> i64 {
        self.variation
    }
}

#[wasm_bindgen]
pub fn greet() {
    alert("👋 from Wasm");
}

fn apply_room_to_map(room: &Rect, map: &mut Vec<Vec<Tile>>) {
    for y in room.y1 + 1..=room.y2 {
        for x in room.x1 + 1..=room.x2 {
            map[y as usize][x as usize].value = 0;
        }
    }
}

fn apply_horizontal_tunnel(map: &mut Vec<Vec<Tile>>, x1: i32, x2: i32, y: i32) {
    for x in min(x1, x2)..=max(x1, x2) {
        if x > 0 && x < 32 {
            map[y as usize][x as usize].value = 0;
        }
    }
}

fn apply_vertical_tunnel(map: &mut Vec<Vec<Tile>>, y1: i32, y2: i32, x: i32) {
    for y in min(y1, y2)..=max(y1, y2) {
        if y > 0 && y < 32 {
            map[y as usize][x as usize].value = 0;
        }
    }
}

#[wasm_bindgen]
pub fn generate(width: i64, height: i64) -> Map {
    console_error_panic_hook::set_once();

    let mut map = Vec::new();

    for y in 0..height {
        map.push(Vec::new());

        for x in 0..width {
            map.last_mut()
                .expect("Unable to get last row in map")
                .push(Tile {
                    location: Point { x, y },
                    explored: false,
                    value: 5,
                    variation: 0,
                });
        }
    }

    let mut rooms: Vec<Rect> = Vec::new();
    const MAX_ROOMS: i32 = 30;
    const MIN_SIZE: i32 = 6;
    const MAX_SIZE: i32 = 10;

    let rand_between = |min, max: i32| {
        ((StdRng::from_entropy().sample::<f32, Standard>(Standard)
            * (max as f32 - min as f32 - 1.))
            + min as f32) as i32
    };

    for _ in 0..MAX_ROOMS {
        let w = rand_between(MIN_SIZE, MAX_SIZE);
        let h = rand_between(MIN_SIZE, MAX_SIZE);
        let x = rand_between(1, 32 - w - 1) - 1;
        let y = rand_between(1, 32 - h - 1) - 1;

        println!("w: {}, h: {}, x: {}, y: {}", w, h, x, y);

        let new_room = Rect::new(x, y, w, h);
        let mut ok = true;
        for other_room in rooms.iter() {
            if new_room.intersect(other_room) {
                ok = false
            }
        }

        if ok {
            apply_room_to_map(&new_room, &mut map);
            if !rooms.is_empty() {
                let (new_x, new_y) = new_room.center();
                let (prev_x, prev_y) = rooms[rooms.len() - 1].center();
                if rand::random() {
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, prev_y);
                    apply_vertical_tunnel(&mut map, prev_y, new_y, new_x);
                } else {
                    apply_vertical_tunnel(&mut map, prev_y, new_y, prev_x);
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, new_y);
                }
            }

            rooms.push(new_room);
        }
    }

    map.into_iter()
        .map(|arr| arr.into_iter().map(JsValue::from).collect::<Array>())
        .collect::<Array>()
        .unchecked_into::<Map>()
}

#[wasm_bindgen]
pub fn compute(a: i64, b: i64) -> i64 {
    a + b
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    pub fn main() {
        super::generate(32, 32);
    }
}
