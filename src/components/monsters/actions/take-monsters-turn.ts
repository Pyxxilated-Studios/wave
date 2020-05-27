import { RootThunk } from "../../../store";
import { Monster } from "../../../types";

import { moveNormally } from "./normal-ai";
import { frozen } from "./frozen-ai";
import { poisoned } from "./poisoned-ai";
import { shocked } from "./shocked-ai";
import { scared } from "./scared-ai";
import { suicidal } from "./suicidal-ai";
import { magical } from "./magical-ai";
import { healer } from "./healer-ai";
import { ranged } from "./ranged-ai";
import { frightened } from "./frightened-ai";

export const takeMonstersTurn = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { monsters, map, world } = getState();
    // get the current monsters
    const { entities } = monsters;
    const { sightBox } = map;
    const { currentMap } = world;
    // find each monster

    Object.entries(entities[currentMap]).forEach(([monsterID]) => {
        const monster = getState().monsters.entities[currentMap][monsterID] as Monster;
        // In the case that one of the other monsters before this one attacked it and killed it
        if (monster === undefined) return;

        switch (monster.ai) {
            case "suicidal":
                dispatch(suicidal(sightBox, currentMap, monster));
                break;
            case "ranged":
                dispatch(ranged(sightBox, currentMap, monster));
                break;
            case "boss":
            case "normal":
                dispatch(moveNormally(sightBox, currentMap, monster));
                break;
            case "frozen":
                dispatch(frozen(sightBox, currentMap, monster));
                break;
            case "poisoned":
                dispatch(poisoned(sightBox, currentMap, monster));
                break;
            case "frightened":
                dispatch(frightened(sightBox, currentMap, monster));
                break;
            case "shocked":
                dispatch(shocked(currentMap, monster));
                break;
            case "scared":
                dispatch(scared(sightBox, currentMap, monster));
                break;
            case "magical":
                dispatch(magical(sightBox, currentMap, monster));
                break;
            case "healer":
                dispatch(healer(sightBox, currentMap, monster));
                break;
            default:
                break;
        }
    });
};
