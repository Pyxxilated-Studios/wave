import {
    MonstersActionType,
    ADD_MONSTERS,
    REVEAL_MONSTER,
    HIDE_MONSTER,
    MONSTER_MOVE,
    DAMAGE_TO_MONSTER,
    MONSTER_DIED,
    CHANGE_AI,
    MONSTER_HEAL,
} from "./types";
import { Point, Monster, Direction, MonsterAI } from "../../types";

export const addMonsters = (currentMap: string, monsters: Monster[]): MonstersActionType => {
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

export const monsterMove = (
    id: string,
    currentMap: string,
    position: Point,
    direction: Direction,
): MonstersActionType => {
    return {
        type: MONSTER_MOVE,
        id,
        currentMap,
        position,
        direction,
    };
};

export const damageToMonster = (
    amount: number,
    monsterId: string,
    map: string,
    entity: string,
    from: string,
): MonstersActionType => {
    return { type: DAMAGE_TO_MONSTER, amount, monsterId, map, entity, from };
};

export const healMonster = (amount: number, id: string, map: string, entity: string): MonstersActionType => {
    return { type: MONSTER_HEAL, amount, id, map, entity };
};

export const monsterDied = (entity: string): MonstersActionType => {
    return { type: MONSTER_DIED, entity };
};

export const resetMonsterAI = (
    map: string,
    id: string,
    entity: string,
    to: MonsterAI,
    from: MonsterAI,
): MonstersActionType => {
    return {
        type: CHANGE_AI,
        map,
        id,
        entity,
        to,
        from,
        turns: 0,
        original: to,
    };
};

export const changeMonsterAI = (
    map: string,
    id: string,
    entity: string,
    to: MonsterAI,
    from: MonsterAI,
    turns: number,
    original: MonsterAI,
): MonstersActionType => {
    return { type: CHANGE_AI, map, id, entity, to, from, turns, original };
};
