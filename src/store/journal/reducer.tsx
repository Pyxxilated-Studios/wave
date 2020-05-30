import React, { ReactNode } from "react";
import cloneDeep from "lodash.clonedeep";
import { v4 as uuidv4 } from "uuid";

import { JournalState, JournalActionType, ABILITY_CHECK, MONSTER_ABILITY_CHECK, CRITICAL_HIT, LEVEL_UP } from "./types";
import { RESET, LOAD } from "../system/types";
import { HEAL, RESTORE, DAMAGE_TO_PLAYER, GAIN_EXPERIENCE, GET_GOLD } from "../stats/types";
import { USE_PROJECTILE, MONSTER_USE_PROJECTILE, EFFECT_PLAYER } from "../player/types";
import { DAMAGE_TO_MONSTER, MONSTER_DIED, MONSTER_HEAL, CHANGE_AI } from "../monsters/types";
import { GET_ITEM } from "../inventory/types";

import { Ammo } from "../../types";
import { MAX_JOURNAL_ENTRIES, LEVEL_UP_ABILITY_POINTS } from "../../constants";

import { isAbilityAllocationLevel } from "../../utils/is-ability-allocation-level";

import spells from "../../data/spells";

// This is complicated... but it seems to work
type JournalEntry = {
    key: string;
    entry: {
        key: string;
        props: {
            children: (
                | string
                | { type: string; props: { type: string; className: string; children: string | number } }
            )[];
        };
    };
};

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
    if (state.entries.length > MAX_JOURNAL_ENTRIES) {
        // Make sure we don't keep too many entries so we use less memory and don't slow down the game
        state.entries = state.entries.slice(state.entries.length - MAX_JOURNAL_ENTRIES);
    }

    switch (action.type) {
        case MONSTER_ABILITY_CHECK: {
            const { entity, attackValue, check, against, defender } = action;

            const newState = cloneDeep(state);

            if (defender === "player") {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} attacked you with an attack value of{" "}
                            {colourise(attackValue, "score")} against your {colourise(against, "ability")} value of{" "}
                            {colourise(check, "score")}
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} attacked the {colourise(defender, "")} with an attack value
                            of {colourise(attackValue, "score")} against their {colourise(against, "ability")} value of{" "}
                            {colourise(check, "score")}
                        </p>
                    ),
                });
            }
            return newState;
        }

        case CRITICAL_HIT: {
            const { ability, roll } = action;

            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You performed {aOrAn(ability)} {colourise(ability, "ability")} check and rolled a{" "}
                        {colourise(roll, "score")},{colourise(" critical hit!", "damage-to-monster")}
                    </p>
                ),
            });

            return newState;
        }

        case ABILITY_CHECK: {
            const { ability, entity, check, against, againstAbility } = action;

            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You performed {aOrAn(ability)} {colourise(ability, "ability")} check and rolled{" "}
                        {colourise(check, "score")}, which {check >= against ? "succeeded" : "failed"} against the{" "}
                        {colourise(againstAbility, "ability")} value of {colourise(against, "score")} for the{" "}
                        {colourise(entity, "type")}
                    </p>
                ),
            });

            return newState;
        }

        case HEAL: {
            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You restored {colourise(action.amount, "restore-health")} health!</p>,
            });
            return newState;
        }

        case RESTORE: {
            if (action.kind === "passive") return state;

            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You restored {colourise(action.amount, "restore-mana")} mana!</p>,
            });
            return newState;
        }

        case DAMAGE_TO_PLAYER: {
            const { from, damage } = action;
            const newState = cloneDeep(state);

            if (from.from === "suicide" && from.entity) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(from.entity, "type")} committed suicide, dealing{" "}
                            {colourise(damage, "damage-to-player")} damage to you!
                        </p>
                    ),
                });
            } else if (from.from !== undefined) {
                // The player was damaged by an effect applied to them
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            You took {colourise(damage, "damage-to-player")} damage from {colourise(from.from, "ai")}!
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry:
                        action.damage === 0 ? (
                            <p key={uuidv4()}>The {colourise(from.entity || "", "type")} missed you!</p>
                        ) : (
                            <p key={uuidv4()}>
                                The {colourise(from.entity || "", "type")} dealt {colourise(damage, "damage-to-player")}{" "}
                                damage to you!
                            </p>
                        ),
                });
            }
            return newState;
        }

        case DAMAGE_TO_MONSTER: {
            const { entity, amount, from } = action;

            const newState = cloneDeep(state);

            if (from === "player") {
                newState.entries.push({
                    key: uuidv4(),
                    entry:
                        amount === 0 ? (
                            <p key={uuidv4()}>You missed the {colourise(entity, "type")}!</p>
                        ) : (
                            <p key={uuidv4()}>
                                You dealt {colourise(amount, "damage-to-monster")} damage to the{" "}
                                {colourise(entity, "type")}!
                            </p>
                        ),
                });
            } else if (from === "suicide") {
                newState.entries.push({
                    key: uuidv4(),
                    entry: <p key={uuidv4()}>The {colourise(entity, "type")} killed itself!</p>,
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} took {colourise(amount, "damage-to-monster")} damage from
                            the {colourise(from, "damage-type")}!
                        </p>
                    ),
                });
            }
            return newState;
        }

        case MONSTER_HEAL: {
            const { entity, amount } = action;

            const newState = cloneDeep(state);
            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        The {colourise(entity, "type")} healed {colourise(amount, "health-gain")} health!
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

        case USE_PROJECTILE: {
            const { name } = action.projectile;

            const newState = cloneDeep(state);

            if (action.projectile.kind === "spell") {
                newState.entries.push({
                    key: uuidv4(),
                    entry: <p key={uuidv4()}>You cast {colourise(name, "spell-cast")}</p>,
                });
            } else {
                const { useText } = action.projectile as Ammo;

                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            You {useText} {colourise(name, "projectile")}
                        </p>
                    ),
                });
            }

            return newState;
        }

        case MONSTER_USE_PROJECTILE: {
            const { projectile, entity } = action;
            const { name } = projectile;

            const newState = cloneDeep(state);

            if (projectile.kind === "spell") {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} cast {colourise(name, "spell-cast")}!
                        </p>
                    ),
                });
            } else {
                const { useText } = projectile as Ammo;

                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} {useText} {colourise(name, "projectile")}
                        </p>
                    ),
                });
            }

            return newState;
        }

        case EFFECT_PLAYER: {
            const { effect } = action;

            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You were {colourise(effect, "ai")}!</p>,
            });

            return newState;
        }

        case CHANGE_AI: {
            const { from, to, entity, original } = action;

            const newState = cloneDeep(state);

            if (from !== original && from !== to) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} stopped being {colourise(from, "ai")}!
                        </p>
                    ),
                });
            } else {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>
                            The {colourise(entity, "type")} was {colourise(to, "ai")}!
                        </p>
                    ),
                });
            }

            return newState;
        }

        case GAIN_EXPERIENCE: {
            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You gained {colourise(action.experience, "experience")} experience!</p>,
            });

            return newState;
        }

        case GET_ITEM: {
            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You gained an item: {colourise(action.item.name, "get-item")}</p>,
            });
            return newState;
        }

        case GET_GOLD: {
            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: <p key={uuidv4()}>You gained {colourise(action.amount, "gold")} gold!</p>,
            });

            return newState;
        }

        case LEVEL_UP: {
            const { level, health, mana } = action;

            const newState = cloneDeep(state);

            newState.entries.push({
                key: uuidv4(),
                entry: (
                    <p key={uuidv4()}>
                        You reached level {colourise(level, "level")}, gained {colourise(health, "health-gain")} health
                        and {colourise(mana, "mana-gain")} mana!
                    </p>
                ),
            });

            if (isAbilityAllocationLevel(level)) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: (
                        <p key={uuidv4()}>You gained {colourise(LEVEL_UP_ABILITY_POINTS, "level")} ability points!</p>
                    ),
                });
            }

            const unlockedSpell = spells.filter((spell) => spell.unlockLevel === level).pop();

            if (unlockedSpell) {
                newState.entries.push({
                    key: uuidv4(),
                    entry: <p key={uuidv4()}>You unlocked the {colourise(unlockedSpell.name, "level")} spell!</p>,
                });
            }

            return newState;
        }

        // case SET_JOURNAL_SCROLLING:
        //     return { ...state, scroll: true };

        case "persist/REHYDRATE":
        case LOAD: {
            if (action.payload) action.data = action.payload;
            if (!(action.data && action.data.journal)) return initialState;

            const newState = cloneDeep(action.data.journal);

            newState.entries = newState.entries.map(({ key, entry }: JournalEntry) => ({
                key,
                entry: (
                    <p key={entry.key}>
                        {entry.props.children.map((child) => {
                            if (typeof child === "string") {
                                return child;
                            } else {
                                return colourise(child.props.children, child.props.className);
                            }
                        })}
                    </p>
                ),
            }));

            return { ...initialState, ...newState };
        }

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default JournalReducer;
