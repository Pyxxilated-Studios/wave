pub mod dice;
pub mod map;

pub const MAX_ROOMS: i32 = 30;
pub const MIN_ROOM_SIZE: i32 = 6;
pub const MAX_ROOM_SIZE: i32 = 10;

pub const TILE_WIDTH: i32 = 64;

// Set the number of tiles to pad the map with (so the player cant see edge)
pub const MAP_PADDING_DISTANCE: i32 = 5;
