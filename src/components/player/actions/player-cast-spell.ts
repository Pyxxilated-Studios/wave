import { RootThunk } from "../../../store";

import { Monster, Spell, HealEffect, DamageEffect, ChangeAIEffect } from "../../../types";

import calculateModifier from "../../../utils/calculate-modifier";
import { d20 } from "../../../utils/dice";
import { monsterAtPosition } from "../../../utils/movement";

import { findTarget } from "./player-attack";
import errorMessage from "../../dialog-manager/actions/error-message";
import { playerTakeTurn } from "../../../store/player/actions";
import { abilityCheck } from "../../../store/journal/actions";
import { getExperience } from "../../../store/stats/actions";
import { pause } from "../../../store/dialog/actions";
import { monsterDied } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";

/**
 * Change a monsters AI from an effect that the spell the players casting
 * causes.
 *
 * @param spell The spell the player is casting
 * @param currMonster The monster that's being targetted
 */
const changeMonsterAI = (spell: Spell, currMonster: Monster): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    if (!spell.effects) return;

    const { currentMap } = getState().world;
    const { to, turns, chance } = spell.effects.find((effect) => effect.effect === "changeAI") as ChangeAIEffect;

    // If they're already under the effects of something, don't apply a new effect
    if (currMonster.ai !== currMonster.originalAI) return;

    // If we have a probabilty to hit, then use that to check if we do
    if (!chance || chance.proc()) {
        // dispatch({
        //     type: "CHANGE_AI",
        //     payload: {
        //         from: currMonster.ai,
        //         ai: to,
        //         turns,
        //         id: currMonster.id,
        //         map: currentMap,
        //         entity: currMonster.type,
        //         original: currMonster.originalAI,
        //     },
        // });
    }
};

const doesProcOnBoss = (): boolean => {
    // Give the bosses some chance to not have their AI changed when hit
    return Math.random() * 100 < 20;
};

const changeBossAI = (spell: Spell, currMonster: Monster, criticalHit: boolean): RootThunk => async (
    dispatch,
): Promise<void> => {
    if (criticalHit || doesProcOnBoss()) dispatch(changeMonsterAI(spell, currMonster));
};

export const castSpell = (): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, player, monsters, world } = getState();
    const { position, direction, spell } = player;

    if (!spell) {
        dispatch(errorMessage('Select a spell first ("b")'));
        return;
    } else if (spell.manaCost > stats.mana) {
        dispatch(errorMessage("Not enough mana"));
        return;
    }

    if (spell.target === "self") {
        if (!spell.effects) return;

        dispatch({
            type: "CAST_SPELL",
            payload: { position: position, projectile: spell },
        });

        const intelligenceModifier = calculateModifier(stats.abilities.intelligence);

        const effect = spell.effects.find((effect) => effect.effect === "heal");

        const healAmount =
            (effect as HealEffect).amount.roll(false) + (intelligenceModifier > 0 ? intelligenceModifier : 0);

        // dispatch({
        //     type: "HEAL_HP",
        //     payload: healAmount,
        // });

        dispatch(playerTakeTurn());

        // dispatch(applyEffects());
    } else if (spell.target === "enemy") {
        const { currentMap } = world;
        const { entities } = monsters;

        const { location, monsterId } = findTarget(position, direction, spell.range, entities[currentMap]);

        if (monsterId) {
            // If we're targetting a monster
            const currMonster = entities[currentMap][monsterId] as Monster;

            const modifier = calculateModifier(stats.abilities.intelligence);

            const roll = d20();
            const criticalHit = roll === 20;
            const attackValue = roll + modifier;

            // dispatch({
            //     type: "CAST_SPELL",
            //     payload: { position: location, projectile: spell },
            // });

            if (criticalHit) {
                // dispatch({
                //     type: "CRITICAL_HIT",
                //     payload: {
                //         notation: "d20 + " + modifier,
                //         roll: roll,
                //         ability: "intelligence",
                //     },
                // });
            } else {
                dispatch(
                    abilityCheck(
                        "d20 + " + modifier,
                        attackValue,
                        "intelligence",
                        currMonster.defence,
                        currMonster.type,
                        "defence",
                    ),
                );
            }

            const effect = spell.effects?.find((effect) => effect.effect === "damage");

            if (!effect) return;

            const damageEffect = effect as DamageEffect;

            const damage = criticalHit
                ? damageEffect.dice.roll(true)
                : attackValue >= currMonster.defence
                ? damageEffect.dice.roll(false)
                : 0;

            // deal damage to monster
            dispatch({
                type: "DAMAGE_TO_MONSTER",
                payload: {
                    damage,
                    id: currMonster.id,
                    map: currentMap,
                    entity: currMonster.type,
                    from: "player",
                },
            });

            // check if monster died
            if (currMonster.health - damage <= 0) {
                // and get some exp
                dispatch(getExperience(currMonster.experience));
                if (stats.experience + currMonster.experience >= stats.experienceToLevel) {
                    dispatch(pause(true, { levelUp: true }));
                }
                // play death sound
                dispatch(monsterDied(currMonster.type));
                // replace monster will blood spill
                // need to pass relative tile index
                dispatch(addBloodSpill(currMonster.location));
            } else if (damage > 0 && spell.effects) {
                if (currMonster.originalAI === "boss") {
                    dispatch(changeBossAI(spell, currMonster, criticalHit));
                } else {
                    dispatch(changeMonsterAI(spell, currMonster));
                }
            }

            // take a turn if the player attacked something
            dispatch({
                type: "TAKE_TURN",
                payload: null,
            });

            // dispatch(applyEffects());
        } else {
            // Hit a wall or something else
            // dispatch({
            //     type: "CAST_SPELL",
            //     payload: { position: spellPosition, projectile: spell },
            // });
        }
    }
};
