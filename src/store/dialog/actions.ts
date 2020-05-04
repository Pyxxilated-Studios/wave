import { PAUSE, DialogActionType } from './types';
import { PauseReason } from '../../types';

export const pause = (paused: boolean, reason: PauseReason): DialogActionType => {
    return {
        type: PAUSE,
        paused,
        reason,
    };
};
