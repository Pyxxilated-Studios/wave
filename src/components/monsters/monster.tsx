import React, { FunctionComponent } from "react";

import { Monster as MonsterType, Direction } from "../../types";
import { SPRITE_PIXELS } from "../../constants";

import HealthBar from "../health-bar";

import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

interface MonsterProps {
    monster: MonsterType;
}

const Monster: FunctionComponent<MonsterProps> = (props: MonsterProps) => {
    const { monster } = props;
    const spriteCoordinates = translateToSpriteCoordinates(monster.location);

    if (monster.direction !== Direction.West && monster.direction !== Direction.East) {
        // This should never happen, but just in case and to make the compiler happy.
        monster.direction = Direction.West;
    }

    return (
        <div
            style={{
                position: "absolute",
                top: spriteCoordinates.y,
                left: spriteCoordinates.x,
                backgroundImage: `url('${monster.sprite[monster.direction]}')`,
                opacity: monster.visible ? 1 : 0,
                width: SPRITE_PIXELS,
                height: SPRITE_PIXELS,
                transition: "left .35s ease-in-out .15s, top .35s ease-in-out .15s, opacity .35s ease-in-out",
            }}
        >
            <HealthBar value={monster.health} max={monster.maxHealth} />
        </div>
    );
};

export default Monster;
