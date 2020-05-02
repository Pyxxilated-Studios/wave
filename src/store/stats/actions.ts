import { StatsType, GAIN_EXPERIENCE } from "./types";

export const gainExpereince = (experience: number): StatsType => {
  return {
    type: GAIN_EXPERIENCE,
    experience: experience,
  };
};
