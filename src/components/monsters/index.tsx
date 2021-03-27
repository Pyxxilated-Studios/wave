import { useState, useEffect, FunctionComponent, ReactNode } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { MonstersState } from "../../store/monsters/types";
import { WorldState } from "../../store/world/types";

import { Monster as MonsterType } from "../../types";

import Monster from "./monster";

interface StateProps {
    monsters: MonstersState;
    world: WorldState;
}

type MonstersProps = StateProps;

const Monsters: FunctionComponent<MonstersProps> = (props: MonstersProps) => {
    const { currentMap } = props.world;

    const [monstersToRender, setMonstersToRender] = useState<ReactNode>();

    useEffect(() => {
        // Don't bother to render any of the monsters if there aren't any
        if (props.monsters.entities[currentMap] && Object.entries(props.monsters.entities).length > 0) {
            setMonstersToRender(
                Object.entries(props.monsters.entities[currentMap]).map(([uuid, monster]) => (
                    <Monster key={uuid} monster={monster as MonsterType} />
                )),
            );
        }
    }, [props.monsters, currentMap]);

    return <>{monstersToRender}</>;
};

const mapStateToProps = (state: RootState): StateProps => ({
    monsters: state.monsters,
    world: state.world,
});

export default connect(mapStateToProps)(Monsters);
