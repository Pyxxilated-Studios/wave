use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use serde::{Deserialize, Serialize};

use js_sys::Array;

use rand::distributions::uniform::SampleUniform;
use rand::prelude::*;

use std::cmp::{max, min};

pub mod dice;

const MAX_ROOMS: i32 = 30;
const MIN_SIZE: i32 = 6;
const MAX_SIZE: i32 = 10;

enum TileType {
    Floor = 0,
    Downstairs = 2,
    Upstairs = 3,
    Chest = 4,
    Shop = 9,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "Tile[][]")]
    pub type Map;

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, Serialize, Deserialize)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

#[wasm_bindgen]
impl Point {
    #[must_use]
    #[wasm_bindgen(constructor)]
    pub fn new(x: i32, y: i32) -> Self {
        Self { x, y }
    }

    #[must_use]
    pub fn serialize(self) -> JsValue {
        serde_wasm_bindgen::to_value(&self).expect("There was an error serializing the point")
    }

    #[must_use]
    pub fn deserialize(value: JsValue) -> Point {
        let value: Self = serde_wasm_bindgen::from_value(value)
            .expect("There was an error deserializing the point");
        value
    }
}

pub struct Rect {
    pub left: i32,
    pub right: i32,
    pub top: i32,
    pub bottom: i32,
}

impl Rect {
    #[must_use]
    pub fn new(x: i32, y: i32, w: i32, h: i32) -> Self {
        Self {
            left: x,
            top: y,
            right: x + w,
            bottom: y + h,
        }
    }

    #[must_use]
    pub fn intersect(&self, other: &Self) -> bool {
        self.left <= other.right
            && self.right >= other.left
            && self.top <= other.bottom
            && self.bottom >= other.top
    }

    #[must_use]
    pub fn center(&self) -> (i32, i32) {
        ((self.left + self.right) / 2, (self.top + self.bottom) / 2)
    }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Serialize, Deserialize)]
pub struct Tile {
    pub location: Point,
    pub explored: bool,
    pub value: i32,
    pub variation: i32,
}

#[wasm_bindgen]
impl Tile {
    #[must_use]
    #[wasm_bindgen(constructor)]
    pub fn new(location: Point, explored: bool, value: i32, variation: i32) -> Self {
        Self {
            location,
            explored,
            value,
            variation,
        }
    }

    #[must_use]
    pub fn serialize(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self).expect("There was an error serializing the tile")
    }

    #[must_use]
    pub fn deserialize(value: JsValue) -> Tile {
        let value: Self = serde_wasm_bindgen::from_value(value)
            .expect("There was an error deserializing the tile");
        value
    }
}

fn apply_room_to_map(room: &Rect, map: &mut Vec<Vec<Tile>>) {
    (room.top + 1..=room.bottom).for_each(|y| {
        (room.left + 1..=room.right)
            .for_each(|x| map[y as usize][x as usize].value = TileType::Floor as i32)
    })
}

fn apply_horizontal_tunnel(map: &mut Vec<Vec<Tile>>, x1: i32, x2: i32, y: i32, width: i32) {
    (min(x1, x2)..=max(x1, x2)).for_each(|x| {
        if x > 0 && x < width {
            map[y as usize][x as usize].value = TileType::Floor as i32;
        }
    })
}

fn apply_vertical_tunnel(map: &mut Vec<Vec<Tile>>, y1: i32, y2: i32, x: i32, height: i32) {
    (min(y1, y2)..=max(y1, y2)).for_each(|y| {
        if y > 0 && y < height {
            map[y as usize][x as usize].value = TileType::Floor as i32;
        }
    })
}

struct MapGenerator {
    width: i32,
    height: i32,
    floor_number: i32,
    starting_point: Point,
    rng: StdRng,
}

impl MapGenerator {
    #[must_use]
    fn new(width: i32, height: i32, floor_number: i32, starting_point: Point) -> Self {
        Self {
            width,
            height,
            floor_number,
            starting_point,
            rng: StdRng::from_entropy(),
        }
    }

    #[must_use]
    fn rand_between<T: SampleUniform>(&mut self, min: T, max: T) -> T {
        self.rng.gen_range(min, max)
    }

    /// Generate a shop somewhere on the map.
    ///
    /// This will search the entire map to find all tiles that are walls, but are
    /// surrounded on at least one side by a walkable tile
    fn generate_shop(&mut self, map: &mut Vec<Vec<Tile>>, wall_type: i32) {
        let edges = map
            .iter()
            .flat_map(|row| {
                row.iter().filter_map(|tile| {
                    let (x, y) = (tile.location.x as usize, tile.location.y as usize);

                    if tile.value != wall_type {
                        None
                    } else if (x + 1 < self.width as usize
                        && map[y][x + 1].value == TileType::Floor as i32)
                        || (x > 0 && map[y][x - 1].value == TileType::Floor as i32)
                        || (y + 1 < self.height as usize
                            && map[y + 1][x].value == TileType::Floor as i32)
                        || (y > 0 && map[y - 1][x].value == TileType::Floor as i32)
                    {
                        Some((x, y))
                    } else {
                        None
                    }
                })
            })
            .collect::<Vec<_>>();

        if !edges.is_empty() {
            let shop_position = edges[self.rand_between(0, edges.len())];
            map[shop_position.1][shop_position.0].value = TileType::Shop as i32;
        }
    }

    /// Generate the rooms that can be found inside the map.
    ///
    /// This will also generate the tunnels between these rooms,
    /// and the stairs between the previous floor and the next.
    fn generate_rooms(&mut self, mut map: &mut Vec<Vec<Tile>>) {
        let mut rooms: Vec<Rect> = Vec::with_capacity(MAX_ROOMS as usize);

        let (w, h) = (
            self.rand_between(MIN_SIZE, MAX_SIZE),
            self.rand_between(MIN_SIZE, MAX_SIZE),
        );

        let starting_room = Rect::new(
            if self.starting_point.x - w / 2 < 0 {
                w / 2 - self.starting_point.x
            } else {
                self.starting_point.x - w / 2
            },
            if self.starting_point.y - h / 2 < 0 {
                h / 2 - self.starting_point.y
            } else {
                self.starting_point.y - h / 2
            },
            w,
            h,
        );

        if self.floor_number > 1 {
            map[self.starting_point.y as usize][self.starting_point.x as usize].value =
                TileType::Downstairs as i32;
        }

        apply_room_to_map(&starting_room, &mut map);
        rooms.push(starting_room);

        (1..MAX_ROOMS).for_each(|_| {
            let w = self.rand_between(MIN_SIZE, MAX_SIZE);
            let h = self.rand_between(MIN_SIZE, MAX_SIZE);
            let x = self.rand_between(1, self.width - w - 1) - 1;
            let y = self.rand_between(1, self.height - h - 1) - 1;

            let new_room = Rect::new(x, y, w, h);

            if rooms.iter().all(|rm| !rm.intersect(&new_room)) {
                apply_room_to_map(&new_room, &mut map);

                let (new_x, new_y) = new_room.center();
                let (prev_x, prev_y) = rooms.last().unwrap().center();

                if rand::random() {
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, prev_y, self.width);
                    apply_vertical_tunnel(&mut map, prev_y, new_y, new_x, self.height);
                } else {
                    apply_vertical_tunnel(&mut map, prev_y, new_y, prev_x, self.height);
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, new_y, self.width);
                }

                // Add a random chest
                let x = self.rand_between(new_room.left + 1, new_room.right - 1);
                let y = self.rand_between(new_room.top + 1, new_room.bottom - 1);

                map[y as usize][x as usize].value = TileType::Chest as i32;

                rooms.push(new_room);
            }
        });

        // Add some stairs to go to the next level
        let (x, y) = rooms.last().unwrap().center();
        map[y as usize][x as usize].value = TileType::Upstairs as i32;
    }

    #[must_use]
    pub fn generate(mut self) -> Map {
        let wall_type = 5 + self.floor_number / 30;

        let mut map = (0..self.height)
            .map(|y| {
                (0..self.width)
                    .map(|x| Tile {
                        location: Point { x, y },
                        explored: false,
                        value: wall_type,
                        variation: 0,
                    })
                    .collect()
            })
            .collect();

        self.generate_rooms(&mut map);

        if self.floor_number > 0 {
            self.generate_shop(&mut map, wall_type);
        }

        map.into_iter()
            .map(|arr| arr.into_iter().map(JsValue::from).collect::<Array>())
            .collect::<Array>()
            .unchecked_into::<Map>()
    }
}

#[must_use]
#[wasm_bindgen]
pub fn generate(width: i32, height: i32, position: Point, floor_number: i32) -> Map {
    console_error_panic_hook::set_once();

    MapGenerator::new(width, height, floor_number, position).generate()
}
