import React, { FunctionComponent } from "react";

import { Entity } from "../../types";
import { SPRITE_PIXELS } from "../../constants";

import HealthBar from "../../components/health-bar";

import { translateToSpriteCoordinates } from "../../utils/translate-point-sprite";

interface MonsterProps {
    monster: Entity;
}

const Monster: FunctionComponent<MonsterProps> = (props: MonsterProps) => {
    const { monster } = props;
    const spriteCoordinates = translateToSpriteCoordinates(monster.location);

    return (
        <div
            style={{
                position: "absolute",
                top: spriteCoordinates.y,
                left: spriteCoordinates.x,
                backgroundImage: `url('${monster.sprite}')`,
                opacity: monster.visible ? 1 : 0,
                width: SPRITE_PIXELS,
                height: SPRITE_PIXELS,
                transition: "left .35s ease-in-out .15s, top .35s ease-in-out .15s, opacity .35s ease-in-out",
            }}
        >
            <HealthBar value={monster.hp} max={monster.maxHp} />
        </div>
    );
};

export default Monster;
