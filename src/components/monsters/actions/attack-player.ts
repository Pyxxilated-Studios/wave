import { RootThunk } from "../../../store";
import { pause } from "../../../store/dialog/actions";
import { playerDie, monsterUseProjectile, monsterAttack } from "../../../store/player/actions";

import { Monster, Direction, Target } from "../../../types";
import { monsterAbilityCheck } from "../../../store/journal/actions";
import { damageToPlayer } from "../../../store/stats/actions";

export const attackPlayer = (monster: Monster): RootThunk => async (dispatch, getState): Promise<void> => {
    const { stats, player } = getState();
    const { attackValue, dice, type, projectile, location } = monster;

    const attack = attackValue.roll(false);

    const calculatedMonsterDamage = attack >= Math.max(stats.defence, 0) ? dice.roll(false) : 0;

    if (projectile && projectile.target === Target.Enemy) {
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

        dispatch(monsterUseProjectile(location, targetPosition, direction, projectile, type));
    }

    dispatch(monsterAbilityCheck(attack, Math.max(stats.defence, 0), "defence", type, "player"));

    if (calculatedMonsterDamage > 0) {
        dispatch(monsterAttack());
    }

    dispatch(damageToPlayer(calculatedMonsterDamage, { entity: type }));

    // check if player died
    if (stats.health - calculatedMonsterDamage <= 0) {
        // play death sound
        dispatch(playerDie({ entity: type }));
        // if it did, game over
        dispatch(pause(true, { gameOver: true }));
    }
};
