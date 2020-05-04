import { StatsActionType, GAIN_EXPERIENCE } from './types';

export const gainExpereince = (experience: number): StatsActionType => {
    return {
        type: GAIN_EXPERIENCE,
        experience: experience,
    };
};
