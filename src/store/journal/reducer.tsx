import React, { ReactNode } from "react";
import cloneDeep from "lodash.clonedeep";
import { v4 as uuidv4 } from "uuid";

import { JournalState, ABILITY_CHECK, JournalActionType } from "./types";
import { RESET } from "../system/types";
import { DAMAGE_TO_MONSTER, MONSTER_DIED } from "../monsters/types";

const initialState: JournalState = {
    entries: [],
    scroll: true,
};

const aOrAn = (nextWord: string): string => ("aeiou".includes(nextWord.charAt(0).toLowerCase()) ? "an" : "a");

const colourise = (value: string | number, type: string): ReactNode => (
    <span key={uuidv4()} className={type}>
        {value}
    </span>
);

const JournalReducer = (state = initialState, action: JournalActionType): JournalState => {
    switch (action.type) {
        case ABILITY_CHECK: {
            const { ability, entity, roll, check, against, againstAbility } = action;

            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You performed {aOrAn(ability)} {colourise(ability, "ability")} check and rolled a{" "}
                        {colourise(roll, "score")}, which {check >= against ? "succeeded" : "failed"} against the{" "}
                        {colourise(againstAbility, "ability")} value of {colourise(against, "score")} for the{" "}
                        {colourise(entity, "type")}
                    </p>
                ),
            });

            return newState;
        }

        case DAMAGE_TO_MONSTER: {
            const { entity, amount } = action;

            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry:
                    amount === 0 ? (
                        <p key={uuidv4()}>You missed the {colourise(entity, "type")}!</p>
                    ) : (
                        <p key={uuidv4()}>
                            You dealt {colourise(amount, "damage-to-monster")} damage to the {colourise(entity, "type")}
                            !
                        </p>
                    ),
            });
            return newState;
        }

        case MONSTER_DIED: {
            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You vanquished the {colourise(action.entity, "type")}!</p>,
            });

            return newState;
        }

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default JournalReducer;
