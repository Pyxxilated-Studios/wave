import { RootThunk } from "../../../store";
import { playerDie, monsterUseProjectile, monsterAttack, effectPlayer } from "../../../store/player/actions";
import { pause } from "../../../store/dialog/actions";

import { Monster, Spell, HealEffect, Direction, ChangeAIEffect } from "../../../types";
import { AI_CHANGE_TURNS } from "../../../constants";
import { damageToPlayer } from "../../../store/stats/actions";
import { healMonster } from "../../../store/monsters/actions";
import { monsterAbilityCheck } from "../../../store/journal/actions";

export const monsterCastSpell = (monster: Monster): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, player, world } = getState();
    const { id, attackValue, dice, type, location, projectile } = monster;
    const { currentMap } = world;

    if (!projectile || projectile.kind !== "spell") return;

    const spell = projectile as Spell;

    if (spell.target === "self") {
        dispatch(monsterUseProjectile(location, Direction.North, projectile, type));

        if (!spell.effects) return;

        const effect = spell.effects.find((effect) => effect.effect === "heal");

        if (!effect) return;

        const healAmount = (effect as HealEffect).amount.roll(false);

        dispatch(healMonster(healAmount, id, currentMap, type));
    } else {
        const attack = attackValue.roll(false);
        const calculatedMonsterDamage = attack >= Math.max(stats.defence, 0) ? dice.roll(false) : 0;

        dispatch(monsterAbilityCheck(attack, Math.max(stats.defence, 0), "defence", type, "player"));

        let direction: Direction = Direction.North;

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

        dispatch(monsterUseProjectile(targetPosition, direction, projectile, type));

        if (calculatedMonsterDamage > 0) {
            dispatch(monsterAttack());

            const { effects } = monster.projectile as Spell;

            if (effects && effects) {
                const effect = effects.find((effect) => effect.effect === "changeAI") as ChangeAIEffect;

                if (player.effects.some((eff) => eff.effect === effect.effect && eff.immunityTurns <= 0)) {
                    const damage = effect.extraEffect?.effect === "damage over time" ? effect.extraEffect.dice : "";
                    if (damage.length > 0) {
                        dispatch(effectPlayer(effect.effect, AI_CHANGE_TURNS, damage, type));
                    }
                }
            }
        }

        dispatch(damageToPlayer(calculatedMonsterDamage, type));

        // check if player died
        if (stats.health - calculatedMonsterDamage <= 0) {
            // play death sound
            dispatch(playerDie({ entity: type }));

            // if it did, game over
            dispatch(pause(true, { gameOver: true }));
        }
    }
};
