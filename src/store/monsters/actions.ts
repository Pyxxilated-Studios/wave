import {
    MonstersActionType,
    ADD_MONSTERS,
    REVEAL_MONSTER,
    HIDE_MONSTER,
    MONSTER_MOVE,
    DAMAGE_TO_MONSTER,
    MONSTER_DIED,
} from "./types";
import { Entity, Point } from "../../types";

export const addMonsters = (currentMap: string, monsters: Entity[]): MonstersActionType => {
    return {
        type: ADD_MONSTERS,
        currentMap,
        monsters,
    };
};

export const revealMonster = (id: string, currentMap: string): MonstersActionType => {
    return {
        type: REVEAL_MONSTER,
        id,
        currentMap,
    };
};

export const hideMonster = (id: string, currentMap: string): MonstersActionType => {
    return {
        type: HIDE_MONSTER,
        id,
        currentMap,
    };
};

export const monsterMove = (id: string, currentMap: string, position: Point): MonstersActionType => {
    return {
        type: MONSTER_MOVE,
        id,
        currentMap,
        position,
    };
};

export const damageToMonster = (amount: number, monsterId: string, map: string, entity: string): MonstersActionType => {
    return { type: DAMAGE_TO_MONSTER, amount, monsterId, map, entity };
};

export const monsterDied = (entity: string): MonstersActionType => {
    return { type: MONSTER_DIED, entity };
};
