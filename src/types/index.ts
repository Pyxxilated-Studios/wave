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

export interface Entity {
    kind: "monster";
    id: string;
    location: Point;
    visible: boolean;
}

export type MonsterAI =
    | "normal"
    | "frozen"
    | "poisoned"
    | "scared"
    | "frightened"
    | "healer"
    | "shocked"
    | "magical"
    | "suicidal"
    | "ranged"
    | "boss";

export interface Monster extends Entity {
    kind: "monster";
    type: string;
    health: number;
    maxHealth: number;
    attackValue: string;
    defence: number;
    dice: string;
    experience: number;
    sprite: { [Direction.West]: string; [Direction.East]: string };
    ai: MonsterAI;
    originalAI: MonsterAI;
    direction: Direction;
    aiTurns: number;
    projectile?: Projectile;
}

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
    gameRunning?: boolean;
    gameInstructions?: boolean;
    gameWin?: boolean;
    chest?: boolean;
    shop?: boolean;
    settings?: boolean;
    inventory?: boolean;
    journalDialog?: boolean;
    spellbookDialog?: boolean;
    tutorialDialog?: boolean;
    tutorialPage?: string;
    levelUp?: boolean;
    fromLevelUp?: boolean;
    abilityDialog?: boolean;
    playerOpenedAbilityDialog?: boolean;
    characterCreation?: boolean;
}

export interface Character {
    name: string;
    race: string;
    cclass: string;
}

export interface ItemEffect {
    "mana bonus"?: number;
    "health bonus"?: number;
    "defence bonus"?: number;
}

export interface EquippedItems {
    weapon?: Weapon;
    ring?: Armour;
    helmet?: Armour;
    body?: Armour;
    legs?: Armour;
    boots?: Armour;
    gloves?: Armour;
}

export type ConsumableItems = "potion";
export type MiscellaneousItems = "backpack";

export interface Item {
    type: "weapon" | "armour" | "consumable" | MiscellaneousItems | ConsumableItems;
    name: string;
    image: string;
    price: number;
    bonus?: string;
    effects?: ItemEffect;
}

export interface Armour extends Item {
    type: "armour";
    kind: Exclude<keyof EquippedItems, "weapon">;
}

export enum Target {
    Self,
    Enemy,
}

export enum SpellType {
    Combat,
    Assist,
}

export enum SpellEffectType {
    ChangeAI,
    Damage,
    DamageOverTime,
    Heal,
}

export interface Projectile {
    type: "spell" | "ammo";
    name: string;
    target: Target;
    animationFrames: number;
    image: string;
    sprite: string;
}

export interface Ammo extends Projectile {
    type: "ammo";
    useText: string;
}

export interface Effect {
    effect: SpellEffectType;
    turns: number;
    immunityTurns: number;
    damage: string;
}

export interface ChangeAIEffect {
    effect: SpellEffectType.ChangeAI;
    to: MonsterAI;
    turns: number;
    description: string;
    chance?: {
        proc: () => boolean;
        description: string;
        effects?: SpellEffect[];
    };
    extraEffect?: SpellEffect;
}

export interface HealEffect {
    effect: SpellEffectType.Heal;
    amount: string;
}

export interface DamageEffect {
    effect: SpellEffectType.Damage;
    dice: string;
}

export interface DamageOverTime {
    effect: SpellEffectType.DamageOverTime;
    dice: string;
    turns: number;
}

export type SpellEffect = DamageEffect | DamageOverTime | HealEffect | ChangeAIEffect;

export interface Spell extends Projectile {
    type: "spell";
    kind: SpellType;
    range: number;
    manaCost: number;
    description: string;
    unlockLevel: number;
    effects?: SpellEffect[];
}

export type WeaponKind = "melee" | "ranged" | "magic";

export interface Weapon extends Item {
    type: "weapon";
    kind: WeaponKind;
    range: number;
    damage: string;
    projectile?: Projectile;
}

export interface ConsumableItem extends Item {
    type: ConsumableItems;
    kind: "health" | "mana";
    consumeEffect: { manaRestore?: number; healthRestore?: number };
}

export interface MiscellaneousItem extends Item {
    type: MiscellaneousItems;
}

export interface Backpack extends MiscellaneousItem {
    slots: number;
}

export type ItemType = ConsumableItem | MiscellaneousItem | Armour | Weapon;

export interface ChestContents {
    gold?: number;
    experience?: number;
    item?: ItemType;
    position: Point;
    populated: boolean;
}
