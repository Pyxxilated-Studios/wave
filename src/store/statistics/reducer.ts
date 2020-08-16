import { StatisticsState, StatisticsActionType } from "./types";
import { MONSTER_DIED, DAMAGE_TO_MONSTER } from "../monsters/types";
import { MOVE_PLAYER, USE_PROJECTILE } from "../player/types";

import { Spell } from "../../types";
import { GAIN_EXPERIENCE, DAMAGE_TO_PLAYER } from "../stats/types";

const initialState: StatisticsState = {
    steps: 0,
    manaUsed: 0,
    spellsCast: 0,
    experienceGained: 0,
    damageDealt: 0,
    monstersKilled: 0,
    damageTaken: 0,
};

const StatisticsReducer = (state = initialState, action: StatisticsActionType): StatisticsState => {
    switch (action.type) {
        case MOVE_PLAYER: {
            return { ...state, steps: state.steps + 1 };
        }

        case USE_PROJECTILE: {
            if (action.projectile.type === "spell") {
                return {
                    ...state,
                    spellsCast: state.spellsCast + 1,
                    manaUsed: state.manaUsed + (action.projectile as Spell).manaCost,
                };
            }

            return state;
        }

        case DAMAGE_TO_MONSTER: {
            return { ...state, damageDealt: state.damageDealt + action.amount };
        }

        case MONSTER_DIED: {
            return { ...state, monstersKilled: state.monstersKilled + 1 };
        }

        case GAIN_EXPERIENCE: {
            return { ...state, experienceGained: state.experienceGained + action.experience };
        }

        case DAMAGE_TO_PLAYER: {
            return { ...state, damageTaken: state.damageTaken + action.damage };
        }

        default:
            return state;
    }
};

export default StatisticsReducer;
