import { RootThunk } from "../../../store";
import { getExperience } from "../../../store/stats/actions";
import { pause } from "../../../store/dialog/actions";
import { playerTakeTurn, useProjectile, attackMonster } from "../../../store/player/actions";
import { abilityCheck } from "../../../store/journal/actions";
import { damageToMonster, monsterDied } from "../../../store/monsters/actions";
import { addBloodSpill } from "../../../store/world/actions";

import { Point, Direction, Entity, Monster } from "../../../types";
import { UNARMED_DAMAGE } from "../../../constants";

import { d20 } from "../../../utils/dice";
import calculateModifier from "../../../utils/calculate-modifier";

import { traversableTile, getNewPosition, monsterAtPosition, withinBoundary } from "../../../utils/movement";

export const findTarget = (
    position: Point,
    direction: Direction,
    range: number,
    entities: Record<string, Entity>,
): { location: Point; monsterId?: string } => {
    switch (direction) {
        case Direction.North:
            for (let y = position.y; y >= position.y - range; y--) {
                const pos = getNewPosition({ x: position.x, y }, direction);
                const id = monsterAtPosition(pos, entities)?.[0];
                if (id) {
                    return { location: pos, monsterId: id };
                }
            }
            return { location: { x: position.x, y: position.y - range } };

        case Direction.South:
            for (let y = position.y; y <= position.y + range; y++) {
                const pos = getNewPosition({ x: position.x, y }, direction);
                const id = monsterAtPosition(pos, entities)?.[0];
                if (id) {
                    return { location: pos, monsterId: id };
                }
            }
            return { location: { x: position.x, y: position.y + range } };

        case Direction.East:
            for (let x = position.x; x <= position.x + range; x++) {
                const pos = getNewPosition({ x, y: position.y }, direction);
                const id = monsterAtPosition(pos, entities)?.[0];
                if (id) {
                    return { location: pos, monsterId: id };
                }
            }
            return { location: { x: position.x + range, y: position.y } };

        case Direction.West:
            for (let x = position.x; x >= position.x - range; x--) {
                const pos = getNewPosition({ x, y: position.y }, direction);
                const id = monsterAtPosition(pos, entities)?.[0];
                if (id) {
                    return { location: pos, monsterId: id };
                }
            }
            return { location: { x: position.x - range, y: position.y } };

        default:
    }
    return { location: position };
};

const fists = {
    name: "fists",
    image: "",
    value: 0,
    kind: "melee",
    range: 1,
    damage: UNARMED_DAMAGE,
    projectile: undefined,
};

const playerAttack = (): RootThunk => async (dispatch, getState): Promise<void> => {
    // get player direction and the location of position to attack
    const { world, player } = getState();

    const { position, direction } = player;
    const targetPosition = getNewPosition(position, direction);

    const { maps, floorNumber } = world;

    // if the attacked tile is in bounds
    if (withinBoundary(targetPosition) && traversableTile(targetPosition, maps[floorNumber - 1].tiles)) {
        const { stats, world, monsters } = getState();
        const { currentMap } = world;
        const { entities } = monsters;

        const weapon = stats.equippedItems.weapon || fists;

        const target = findTarget(position, direction, weapon.range, entities[currentMap]);
        if (target.monsterId) {
            // If we're targetting a monster
            const targetMonster = entities[currentMap][target.monsterId] as Monster;

            const ability =
                weapon.kind === "melee" ? "strength" : weapon.kind === "ranged" ? "dexterity" : "intelligence";

            const modifier = calculateModifier(stats.abilities[ability]);
            const attackValue = d20() + modifier;

            if (weapon.projectile) {
                dispatch(useProjectile(target.location, weapon.projectile));
            }

            dispatch(
                abilityCheck(
                    "d20 + " + modifier,
                    attackValue,
                    ability,
                    targetMonster.defence,
                    targetMonster.type,
                    "defence",
                ),
            );

            const damage = attackValue >= targetMonster.defence ? weapon.damage.roll() : 0;

            if (damage > 0) {
                // Only show the attack animation if they hit the monster
                dispatch(attackMonster());
            }

            // deal damage to monster
            dispatch(damageToMonster(damage, targetMonster.id, currentMap, targetMonster.type, "player"));

            // check if monster died
            if (targetMonster.health - damage <= 0) {
                // and get some exp
                dispatch(getExperience(targetMonster.experience));

                if (stats.experience + targetMonster.experience >= stats.experienceToLevel) {
                    dispatch(pause(true, { levelUp: true }));
                }

                // play death sound
                dispatch(monsterDied(targetMonster.type));
                // replace monster will blood spill
                // need to pass relative tile index
                dispatch(addBloodSpill(targetMonster.location));
            }

            // take a turn if the player attacked something
            dispatch(playerTakeTurn());
        } else {
            // Hit a wall or something else
            if (weapon.projectile) {
                dispatch(useProjectile(target.location, weapon.projectile));
            }

            dispatch(attackMonster());
        }
    }
};

export default playerAttack;
