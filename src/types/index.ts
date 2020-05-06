export interface Point {
    x: number;
    y: number;
}

export interface Tile {
    location: Point;
    value: number;
    explored: boolean;
    variation: number;
}

export enum Direction {
    North,
    South,
    East,
    West,
}

export interface PaddingTiles {
    top: Tile[][];
    bottom: Tile[][];
    left: Tile[][];
    right: Tile[][];
}

export interface GameMap {
    id: string;
    tiles: Tile[][];
    paddingTiles: PaddingTiles;
}

export interface Monster {
    type: string;
    hp: number;
    maxHp: number;
    attackValue: number;
    defence: number;
    dice: string;
    exp: number;
    sprite: string;
}

export type Entity = Monster & {
    id: string;
    location: Point;
    visible: boolean;
};

export interface Abilities {
    constitution: number;
    dexterity: number;
    strength: number;
    wisdom: number;
    intelligence: number;
    charisma: number;
}

export type Ability = keyof Abilities;

export interface PauseReason {
    gameText?: { title: string; body: string };
    gameOver?: boolean;
    gameStart?: boolean;
    gameInstructions?: boolean;
    gameWin?: boolean;
    chest?: boolean;
    chestOpen?: boolean;
    shop?: boolean;
    settings?: boolean;
    inventory?: boolean;
    journalDialog?: boolean;
    spellbookDialog?: boolean;
    levelUp?: boolean;
    fromLevelUp?: boolean;
    abilityDialog?: boolean;
    playerOpenedAbilityDialog?: boolean;
    characterCreation?: boolean;
}

export interface Character {
    characterName: string;
    characterRace: string;
    characterClass: string;
}

export interface ItemEffect {
    manaBonus?: number;
    healthBonus?: number;
    defenceBonus?: number;
}

export interface EquippedItems {
    weapon?: Item;
    ring?: Item;
    helmet?: Item;
    body?: Item;
    legs?: Item;
    boots?: Item;
    gloves?: Item;
}

export type ConsumableItems = "potion";
export type MiscellaneousItems = "backpack";

export interface Item {
    name: string;
    image: string;
    value: number;
    bonus?: string;
    effects?: ItemEffect;
}

export type Armour = Item & {
    type: keyof EquippedItems;
};

export interface Projectile {
    name: string;
    target: string;
    animationFrames: number;
    sprite: string;
}

export type WeaponKind = "melee" | "ranged" | "magic";

export type Weapon = Item & {
    type: "weapon";
    kind: WeaponKind;
    range: number;
    damage: string;
    projectile?: Projectile;
};

export type ConsumableItem = Item & {
    type: ConsumableItems;
    kind: string;
    consumeEffect: { manaRestore?: number; healthRestore?: number };
};

export type MiscellaneousItem = Item & {
    type: MiscellaneousItems;
};

export type Backpack = MiscellaneousItem & {
    slots: number;
};

export type ItemType = ConsumableItem | MiscellaneousItem | Armour;
