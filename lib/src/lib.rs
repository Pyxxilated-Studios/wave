use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

use serde::{Deserialize, Serialize};
use serde_wasm_bindgen;

use js_sys::Array;

use rand::prelude::*;

use std::cmp::{max, min};

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
    // #[get]
    // #[set]
    pub x: i32,
    // #[get]
    // #[set]
    pub y: i32,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen(constructor)]
    pub fn new(x: i32, y: i32) -> Self {
        Self { x, y }
    }

    pub fn serialize(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self).expect("There was an error serializing the point")
    }

    pub fn deserialize(value: JsValue) -> Point {
        let value: Self = serde_wasm_bindgen::from_value(value)
            .expect("There was an error deserializing the point");
        value
    }
}

#[derive(Debug)]
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
#[derive(Debug, Copy, Clone, Serialize, Deserialize)]
pub struct Tile {
    // #[get]
    pub location: Point,
    // #[get]
    // #[set]
    pub explored: bool,
    // #[get]
    // #[set]
    pub value: i32,
    // #[get]
    // #[set]
    pub variation: i32,
}

#[wasm_bindgen]
impl Tile {
    #[wasm_bindgen(constructor)]
    pub fn new(location: Point, explored: bool, value: i32, variation: i32) -> Self {
        Self {
            location,
            explored,
            value,
            variation,
        }
    }

    pub fn serialize(&self) -> JsValue {
        serde_wasm_bindgen::to_value(&self).expect("There was an error serializing the tile")
    }

    pub fn deserialize(value: JsValue) -> Tile {
        let value: Self = serde_wasm_bindgen::from_value(value)
            .expect("There was an error deserializing the tile");
        value
    }
}

fn apply_room_to_map(room: &Rect, map: &mut Vec<Vec<Tile>>) {
    for y in room.y1 + 1..=room.y2 {
        for x in room.x1 + 1..=room.x2 {
            map[y as usize][x as usize].value = TileType::Floor as i32;
        }
    }
}

fn apply_horizontal_tunnel(map: &mut Vec<Vec<Tile>>, x1: i32, x2: i32, y: i32, width: i32) {
    for x in min(x1, x2)..=max(x1, x2) {
        if x > 0 && x < width {
            map[y as usize][x as usize].value = TileType::Floor as i32;
        }
    }
}

fn apply_vertical_tunnel(map: &mut Vec<Vec<Tile>>, y1: i32, y2: i32, x: i32, height: i32) {
    for y in min(y1, y2)..=max(y1, y2) {
        if y > 0 && y < height {
            map[y as usize][x as usize].value = TileType::Floor as i32;
        }
    }
}

struct MapGenerator {
    width: i32,
    height: i32,
    floor_number: i32,
    starting_point: Point,
}

impl MapGenerator {
    fn new(width: i32, height: i32, floor_number: i32, starting_point: Point) -> Self {
        Self {
            width,
            height,
            floor_number,
            starting_point,
        }
    }

    pub fn generate(self) -> Map {
        let wall_type = 5 + self.floor_number / 30;

        let mut map = Vec::with_capacity(self.height as usize);

        for y in 0..self.height {
            let mut row = Vec::with_capacity(self.width as usize);

            for x in 0..self.width {
                row.push(Tile {
                    location: Point { x, y },
                    explored: false,
                    value: wall_type,
                    variation: 0,
                });
            }

            map.push(row);
        }

        let mut rooms: Vec<Rect> = Vec::with_capacity(MAX_ROOMS as usize);

        let mut rng = StdRng::from_entropy();

        let mut rand_between = |min, max| rng.gen_range(min, max + 1);

        let (w, h) = (
            rand_between(MIN_SIZE, MAX_SIZE),
            rand_between(MIN_SIZE, MAX_SIZE),
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

        for _ in 1..MAX_ROOMS {
            let w = rand_between(MIN_SIZE, MAX_SIZE);
            let h = rand_between(MIN_SIZE, MAX_SIZE);
            let x = rand_between(1, self.width - w - 1) - 1;
            let y = rand_between(1, self.height - h - 1) - 1;

            let new_room = Rect::new(x, y, w, h);

            let no_overlap = rooms.iter().all(|rm| !rm.intersect(&new_room));

            if no_overlap {
                apply_room_to_map(&new_room, &mut map);

                let (new_x, new_y) = new_room.center();
                let (prev_x, prev_y) = rooms[rooms.len() - 1].center();

                if rand::random() {
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, prev_y, self.width);
                    apply_vertical_tunnel(&mut map, prev_y, new_y, new_x, self.height);
                } else {
                    apply_vertical_tunnel(&mut map, prev_y, new_y, prev_x, self.height);
                    apply_horizontal_tunnel(&mut map, prev_x, new_x, new_y, self.width);
                }

                // Add a random chest
                let x = rand_between(new_room.x1, new_room.x2);
                let y = rand_between(new_room.y1, new_room.y2);

                map[y as usize][x as usize].value = TileType::Chest as i32;

                rooms.push(new_room);
            }
        }

        // Add some stairs to go to the next level
        let (x, y) = rooms.last().unwrap().center();
        map[y as usize][x as usize].value = TileType::Upstairs as i32;

        if self.floor_number > 0 {
            let edges = map
                .iter()
                .enumerate()
                .flat_map(|(y, row)| {
                    row.iter()
                        .enumerate()
                        .filter_map(|(x, tile)| {
                            if tile.value == wall_type
                                && (map[y][x - 1].value == TileType::Floor as i32
                                    || map[y][x + 1].value == TileType::Floor as i32
                                    || map[y - 1][x].value == TileType::Floor as i32
                                    || map[y + 1][x].value == TileType::Floor as i32)
                            {
                                Some((x, y))
                            } else {
                                None
                            }
                        })
                        .collect::<Vec<(usize, usize)>>()
                })
                .collect::<Vec<(usize, usize)>>();

            // let mut edges = Vec::new();

            // for y in 1..self.height {
            //     for x in 1..self.width {
            //         if map[y as usize][x as usize].value == wall_type
            //             && (map[y as usize][(x - 1) as usize].value == TileType::Floor as i32
            //                 || map[y as usize][(x + 1) as usize].value == TileType::Floor as i32
            //                 || map[(y - 1) as usize][x as usize].value == TileType::Floor as i32
            //                 || map[(y + 1) as usize][x as usize].value == TileType::Floor as i32)
            //         {
            //             edges.push((x as usize, y as usize));
            //         }
            //     }
            // }

            let shop_position = edges[rand_between(0, edges.len() as i32) as usize];
            map[shop_position.1][shop_position.0].value = TileType::Shop as i32;

            log(&format!("Shop is at position: {:#?}", shop_position));
            log(&format!("Map is: {:#?}", map));
            log(&format!(
                "Shop: {:#?}",
                map[shop_position.1][shop_position.0]
            ));
        }

        map.into_iter()
            .map(|arr| arr.into_iter().map(JsValue::from).collect::<Array>())
            .collect::<Array>()
            .unchecked_into::<Map>()
    }
}

#[wasm_bindgen]
pub fn generate(width: i32, height: i32, position: Point, floor_number: i32) -> Map {
    console_error_panic_hook::set_once();

    MapGenerator::new(width, height, floor_number, position).generate()
}
