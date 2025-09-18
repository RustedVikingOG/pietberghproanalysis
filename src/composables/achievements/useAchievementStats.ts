import { achievementStatsA, achievementStatsB, type AchievementStat } from '@/models/achievements/AchievementStats';

export function useAchievementStats() {
  const getStatsA = (): AchievementStat[] => {
    return achievementStatsA;
  };

  const getStatsB = (): AchievementStat[] => {
    return achievementStatsB;
  };

  return {
    getStatsA,
    getStatsB,
  };
}
