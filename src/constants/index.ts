// Size of the viewport
export const GAME_VIEWPORT_SIZE = 350;
export const GAME_VIEWPORT_SIZE_LARGE = 400;

// Sizes for different screens
export const SCREEN_SMALL_WIDTH = 330;
export const SCREEN_SMALL_HEIGHT = 500;
export const SCREEN_MEDIUM_WIDTH = 600;
export const SCREEN_MEDIUM_HEIGHT = 680;

// Sizes used to determine whether the journal is shown besides the game or as a dialog
export const MIN_WIDTH_FOR_JOURNAL = 1200;
export const MIN_SIDESCREEN_WIDTH_FOR_JOURNAL = 1200;

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

// How fast the player move animation plays (ms)
export const ANIMATION_SPEED = 350;

// Set the duration for showing the snackbar (ms)
export const SNACK_DURATION = 2500;

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

// Max number of inventory items
export const MAX_ITEMS = 8;
export const MAX_ITEMS_UPGRADE = 12;

// Ability score related starting values
export const STARTING_ABILITY_SCORE_VALUE = 8;
export const STARTING_ABILITY_POINTS = 12;
export const MAX_ABILITY_SCORE = 20;
export const LEVEL_UP_ABILITY_POINTS = 2;

// If the player is unarmed, we need them to still be able to attack
export const UNARMED_DAMAGE = "1d4";

// Base player health/mana values
export const BASE_HEALTH = 10;
export const BASE_MANA = 5;

// Base health/mana level up values
export const MIN_HEALTH_BONUS = 1;
export const MIN_MANA_BONUS = 5;

// For calculating buy/sell prices
export const MIN_PRICE_PERCENT = 0.1;
export const MID_PRICE_PERCENT = 0.75;
export const MAX_PRICE_PERCENT = 1.25;

// Set the minimum level for tier X items
export const TIER_2 = 10;
export const TIER_3 = 20;
export const TIER_4 = 30;

// The number of turns an AI change stays in effect
export const AI_CHANGE_TURNS = 3;
// Damage inflicted by poison every time it hits
export const POISON_DAMAGE = "1d4";
export const TURNS_FOR_POISON = 3;
export const SHOCK_DAMAGE = "1d4";

// The maximum amount of journal entries. If this is too large it can slow the game down
export const MAX_JOURNAL_ENTRIES = 100;
