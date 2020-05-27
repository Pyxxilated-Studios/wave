//import { calculateDamage } from "../../../utils/dice";
import { RootThunk } from "../../../store";

const attackPlayer = (attackValue: string, dice: string, type: string): RootThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    /*
  const { stats } = getState();

  const calculatedMonsterDamage =
    attackValue >= Math.max(stats.defence, 0) ? calculateDamage(dice) : 0;

  dispatch({
    type: "MONSTER_ABILITY_CHECK",
    payload: {
      attackValue: attackValue,
      check: Math.max(stats.defence, 0),
      type: type,
    },
  });

  if (calculatedMonsterDamage > 0) {
    // show the attack animation and play sound
    dispatch({
      type: "MONSTER_ATTACK",
      payload: null,
    });
  }

  dispatch({
    type: "DAMAGE_TO_PLAYER",
    payload: { damage: calculatedMonsterDamage, type: type },
  });

  // check if player died
  if (stats.health - calculatedMonsterDamage <= 0) {
    // play death sound
    dispatch({
      type: "PLAYER_DIED",
      payload: null,
    });
    // if it did, game over
    dispatch({
      type: "PAUSE",
      payload: {
        gameOver: true,
        pause: true,
      },
    });
  }
  */
};

export default attackPlayer;
