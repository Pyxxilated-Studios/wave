// Size of the viewport
export const GAME_VIEWPORT_SIZE = 350;
export const GAME_VIEWPORT_SIZE_LARGE = 400;

// Sizes for different screens
export const SCREEN_SMALL_WIDTH = 330;
export const SCREEN_SMALL_HEIGHT = 500;
export const SCREEN_MEDIUM_WIDTH = 600;
export const SCREEN_MEDIUM_HEIGHT = 680;

// Size of each individual sprite
export const SPRITE_SIZE = 32;
export const SPRITE_PIXELS = SPRITE_SIZE.toString() + "px";

// Number of tiles in the map
const TILE_HEIGHT = 32;
const TILE_WIDTH = 32;

// Map size
export const MAP_DIMENSIONS = { width: TILE_WIDTH, height: TILE_HEIGHT };
export const MAP_SIZE = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
};

// Time for the map to transition in/out
export const MAP_TRANSITION_DELAY = 500;

// How far the player can 'see' or 'explore'
export const SIGHT_RADIUS = 3;

// Configuration for random map generation
export const MAX_TUNNELS = 60;
export const MAX_TUNNEL_LENGTH = 5;

// Set the number of tiles to pad the map with (so the player cant see edge)
export const MAP_PADDING_DISTANCE = 5;

// Macros for key codes
export const UP_KEY = 38;
export const DOWN_KEY = 40;
export const LEFT_KEY = 37;
export const RIGHT_KEY = 39;
export const W_KEY = 87;
export const S_KEY = 83;
export const A_KEY = 65;
export const D_KEY = 68;
export const E_KEY = 69;
export const U_KEY = 85;
export const I_KEY = 73;
export const J_KEY = 74;
export const C_KEY = 67;
export const B_KEY = 66;
export const SPACE_KEY = 32;
export const ENTER_KEY = 13;
export const ESC_KEY = 27;

// Ability score related starting values
export const STARTING_ABILITY_SCORE_VALUE = 8;
export const STARTING_ABILITY_POINTS = 12;
export const MAX_ABILITY_SCORE = 20;
