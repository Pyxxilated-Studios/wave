import {
  MonstersTypes,
  ADD_MONSTERS,
  REVEAL_MONSTER,
  HIDE_MONSTER,
  MONSTER_MOVE,
} from "./types";
import { Entity, Point } from "../../types";

export const addMonsters = (
  currentMap: string,
  monsters: Entity[]
): MonstersTypes => {
  return {
    type: ADD_MONSTERS,
    currentMap,
    monsters,
  };
};

export const revealMonster = (
  id: string,
  currentMap: string
): MonstersTypes => {
  return {
    type: REVEAL_MONSTER,
    id,
    currentMap,
  };
};

export const hideMonster = (id: string, currentMap: string): MonstersTypes => {
  return {
    type: HIDE_MONSTER,
    id,
    currentMap,
  };
};

export const monsterMove = (
  id: string,
  currentMap: string,
  position: Point
): MonstersTypes => {
  return {
    type: MONSTER_MOVE,
    id,
    currentMap,
    position,
  };
};
