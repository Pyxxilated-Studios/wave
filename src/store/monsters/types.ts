import { Entity, Point } from "../../types";

export interface MonstersState {
  entities: Record<string, Record<string, Entity>>;
}

export const ADD_MONSTERS = "ADD_MONSTERS";
interface AddMonstersAction {
  type: typeof ADD_MONSTERS;
  currentMap: string;
  monsters: Entity[];
}

export const REVEAL_MONSTER = "REVEAL_MONSTER";
interface RevealMonsterAction {
  type: typeof REVEAL_MONSTER;
  id: string;
  currentMap: string;
}

export const HIDE_MONSTER = "HIDE_MONSTER";
interface HideMonsterAction {
  type: typeof HIDE_MONSTER;
  id: string;
  currentMap: string;
}

export const MONSTER_MOVE = "MONSTER_MOVE";
interface MonsterMoveAction {
  type: typeof MONSTER_MOVE;
  id: string;
  currentMap: string;
  position: Point;
}

export type MonstersTypes =
  | AddMonstersAction
  | RevealMonsterAction
  | HideMonsterAction
  | MonsterMoveAction;
