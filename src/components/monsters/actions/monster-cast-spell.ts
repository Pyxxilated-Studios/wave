import { RootThunk } from "../../../store";
import { playerDie } from "../../../store/player/actions";
import { pause } from "../../../store/dialog/actions";

import { Monster, Spell, HealEffect, Direction } from "../../../types";
import { AI_CHANGE_TURNS, POISON_DAMAGE } from "../../../constants";

export const monsterCastSpell = (monster: Monster): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, player, world } = getState();
    const { id, attackValue, dice, type, location, projectile } = monster;
    const { currentMap } = world;

    if (!projectile || projectile.kind !== "spell") return;

    const spell = projectile as Spell;

    if (spell.target === "self") {
        // dispatch({
        //     type: "MONSTER_CAST_SPELL",
        //     payload: {
        //         location,
        //         direction: "NORTH",
        //         entity: monster.type,
        //         spell: monster.projectile,
        //     },
        // });

        if (!spell.effects) return;

        const effect = spell.effects.find((effect) => effect.effect === "heal");

        if (!effect) return;

        const healAmount = (effect as HealEffect).amount.roll(false);

        // dispatch({
        //     type: "MONSTER_HEAL_HP",
        //     payload: { healAmount, id, map: currentMap, entity: type },
        //     });
    } else {
        const attack = attackValue.roll(false);
        const calculatedMonsterDamage = attack >= Math.max(stats.defence, 0) ? dice.roll(false) : 0;

        dispatch({
            type: "MONSTER_ABILITY_CHECK",
            payload: {
                attackValue: attack,
                check: Math.max(stats.defence, 0),
                against: "defence",
                entity: type,
                defender: "player",
            },
        });

        let direction: Direction;

        const targetPosition = { x: location.x - player.position.x, y: location.y - player.position.y };

        if (player.position.x !== location.x) {
            if (player.position.x < location.x) {
                direction = Direction.West;
                --targetPosition.x;
            } else {
                direction = Direction.East;
                ++targetPosition.y;
            }
        } else if (player.position.y !== location.y) {
            if (player.position.y < location.y) {
                direction = Direction.North;
                --targetPosition.y;
            } else {
                direction = Direction.South;
                ++targetPosition.y;
            }
        }

        // dispatch({
        //     type: "MONSTER_CAST_SPELL",
        //     payload: {
        //         position: targetPosition,
        //         direction,
        //         entity: monster.type,
        //         spell: monster.projectile,
        //     },
        // });

        if (calculatedMonsterDamage > 0) {
            // show the attack animation and play sound
            // dispatch({
            //     type: "MONSTER_ATTACK",
            //     payload: null,
            // });
            // const { changeAI } = monster.projectile.effects;
            // if (changeAI) {
            //     if (player.effects[changeAI.to] && player.effects[changeAI.to].immunityTurns <= 0) {
            //         dispatch({
            //             type: "EFFECT_PLAYER",
            //             payload: {
            //                 effect: changeAI.to,
            //                 turns: AI_CHANGE_TURNS,
            //                 damage: POISON_DAMAGE,
            //                 from: changeAI.effect,
            //             },
            //         });
            //     }
            // }
        }

        // dispatch({
        //     type: "DAMAGE_TO_PLAYER",
        //     payload: { damage: calculatedMonsterDamage, entity: type },
        // });

        // check if player died
        if (stats.health - calculatedMonsterDamage <= 0) {
            // play death sound
            dispatch(playerDie({ entity: type }));

            // if it did, game over
            dispatch(pause(true, { gameOver: true }));
        }
    }
};
