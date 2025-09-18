import { achievementStats, type AchievementStat } from '@/models/achievements/AchievementStats';

export function useAchievementStats() {
  const getStats = (): AchievementStat[] => {
    return achievementStats;
  };

  return {
    getStats,
  };
}
