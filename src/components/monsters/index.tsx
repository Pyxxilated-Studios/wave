import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store';
import { MonstersState } from '../../store/monsters/types';
import { WorldState } from '../../store/world/types';

import Monster from './monster';

interface MonstersProps {
    monsters: MonstersState;
    world: WorldState;
}

const Monsters = (props: MonstersProps) => {
    const { currentMap } = props.world;

    const [monstersToRender, setMonstersToRender] = useState<any | null>(null);

    useEffect(() => {
        const monsterArray: React.ReactElement[] = [];
        // don't try to load if no maps
        if (JSON.stringify(props.monsters.entities) === JSON.stringify({})) {
            setMonstersToRender(null);
        } else if (props.monsters.entities[currentMap]) {
            // find each monster on the current map
            Object.keys(props.monsters.entities[currentMap]).forEach((uuid) => {
                monsterArray.push(<Monster key={uuid} monster={props.monsters.entities[currentMap][uuid]} />);
            });

            setMonstersToRender(monsterArray);
        }
    }, [props.monsters, currentMap]);

    return monstersToRender;
};

const mapStateToProps = ({ monsters, world }: RootState) => ({
    monsters,
    world,
});

export default connect(mapStateToProps)(Monsters);
