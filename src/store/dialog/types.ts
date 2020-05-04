import { Abilities, PauseReason, Appearance, Character } from '../../types';
import { ResetAction } from '../system/types';

export interface DialogState {
    paused: boolean;
    reason: PauseReason;
    abilities: Abilities & { points: number };
    appearance: Appearance;
    abilities_minimum: Abilities;
    character: Character;
}

export const PAUSE = 'PAUSE';
interface PauseAction {
    type: typeof PAUSE;
    paused: boolean;
    reason: PauseReason;
}

export type DialogActionType = PauseAction | ResetAction;
