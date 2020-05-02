export interface StatsState {
  level: number;
}

export const GAIN_EXPERIENCE = "GAIN_EXPERIENCE";
interface GainExperienceAction {
  type: typeof GAIN_EXPERIENCE;
  experience: number;
}

export type StatsType = GainExperienceAction;
