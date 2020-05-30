import { RootThunk } from "../../../store";
import { playerTakeTurn, useProjectile } from "../../../store/player/actions";
import { abilityCheck, rolledCritical } from "../../../store/journal/actions";
import { gainExperience, heal } from "../../../store/stats/actions";
import { pause } from "../../../store/dialog/actions";
import { monsterDied, changeMonsterAI, damageToMonster } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";

import { Monster, Spell, HealEffect, DamageEffect, ChangeAIEffect } from "../../../types";

import calculateModifier from "../../../utils/calculate-modifier";
import { d20 } from "../../../utils/dice";

import errorMessage from "../../dialog-manager/actions/error-message";

import { findTarget } from "./player-attack";
import { applyEffects } from "../../controls/actions/move-player";

/**
 * Change a monsters AI from an effect that the spell the players casting
 * causes.
 *
 * @param spell The spell the player is casting
 * @param monster The monster that's being targetted
 */
const changeAI = (spell: Spell, monster: Monster): RootThunk => async (dispatch, getState): Promise<void> => {
    if (!spell.effects) return;

    const { currentMap } = getState().world;
    const { to, turns, chance } = spell.effects.find((effect) => effect.effect === "changeAI") as ChangeAIEffect;
    const { ai, originalAI, id, type } = monster;

    // If they're already under the effects of something, don't apply a new effect
    if (ai !== originalAI) return;

    // If we have a probabilty to hit, then use that to check if we do
    if (!chance || chance.proc()) {
        dispatch(changeMonsterAI(currentMap, id, type, to, ai, turns, originalAI));
    }
};

const doesProcOnBoss = (): boolean => {
    // Give the bosses some chance to not have their AI changed when hit
    return Math.random() * 100 < 20;
};

const changeBossAI = (spell: Spell, currMonster: Monster, criticalHit: boolean): RootThunk => async (
    dispatch,
): Promise<void> => {
    if (criticalHit || doesProcOnBoss()) dispatch(changeAI(spell, currMonster));
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

        dispatch(useProjectile(position, spell));

        const intelligenceModifier = calculateModifier(stats.abilities.intelligence);

        const effect = spell.effects.find((effect) => effect.effect === "heal");

        const healAmount =
            (effect as HealEffect).amount.roll(false) + (intelligenceModifier > 0 ? intelligenceModifier : 0);

        dispatch(heal("spell", healAmount));

        dispatch(playerTakeTurn());

        applyEffects();
    } else if (spell.target === "enemy") {
        const { currentMap } = world;
        const { entities } = monsters;

        const { location, monsterId } = findTarget(position, direction, spell.range, entities[currentMap]);

        if (monsterId) {
            // If we're targetting a monster
            const monster = entities[currentMap][monsterId] as Monster;

            const modifier = calculateModifier(stats.abilities.intelligence);

            const roll = d20();
            const criticalHit = roll === 20;
            const attackValue = roll + modifier;

            dispatch(useProjectile(location, spell));

            if (criticalHit) {
                dispatch(rolledCritical("d20 + " + modifier, roll, "intelligence"));
            } else {
                dispatch(
                    abilityCheck(
                        "d20 + " + modifier,
                        attackValue,
                        "intelligence",
                        monster.defence,
                        monster.type,
                        "defence",
                    ),
                );
            }

            const effect = spell.effects?.find((effect) => effect.effect === "damage");

            if (!effect) return;

            const damageEffect = effect as DamageEffect;

            const damage = criticalHit
                ? damageEffect.dice.roll(true)
                : attackValue >= monster.defence
                ? damageEffect.dice.roll(false)
                : 0;

            // deal damage to monster
            dispatch(damageToMonster(damage, monster.id, currentMap, monster.type, "player"));

            // check if monster died
            if (monster.health - damage <= 0) {
                // and get some exp
                dispatch(gainExperience(monster.experience));
                if (stats.experience + monster.experience >= stats.experienceToLevel) {
                    dispatch(pause(true, { levelUp: true }));
                }
                // play death sound
                dispatch(monsterDied(monster.type));
                // replace monster will blood spill
                // need to pass relative tile index
                dispatch(addBloodSpill(monster.location));
            } else if (damage > 0 && spell.effects) {
                if (monster.originalAI === "boss") {
                    dispatch(changeBossAI(spell, monster, criticalHit));
                } else {
                    dispatch(changeAI(spell, monster));
                }
            }

            // take a turn if the player attacked something
            dispatch(playerTakeTurn());

            applyEffects();
        } else {
            dispatch(useProjectile(location, spell));
        }
    }
};
