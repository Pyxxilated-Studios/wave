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

export interface PauseReason {
    gameText?: boolean;
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
    characterCustomisation?: boolean;
    playerOpenedAbilityDialog?: boolean;
    characterCreation?: boolean;
}

export interface Appearance {
    hairColour: number;
    skinColour: number;
    eyeColour: number;
    armourColour: number;
    clothesColour: number;
}

export interface Character {
    characterName: string | null;
    characterRace: string;
    characterClass: string;
}
