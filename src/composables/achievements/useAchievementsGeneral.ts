import { achievements, type Achievement } from '@/models/achievements/Achievement';

export function useAchievementsGeneral() {
  const getAchievements = (): Achievement[] => {
    return achievements;
  };

  const getAchievementCategory = (achievement: Achievement): { label: string; class: string } => {
    switch (achievement.category) {
      case 'service':
        return {
          label: 'Service Record',
          class: 'bg-blue-100 text-blue-800'
        };
      case 'leadership':
        return {
          label: 'Leadership',
          class: 'bg-purple-100 text-purple-800'
        };
      case 'casework':
        return {
          label: 'Casework',
          class: 'bg-amber-100 text-amber-800'
        };
      case 'academic':
        return {
          label: 'Academic',
          class: 'bg-green-100 text-green-800'
        };
      case 'technical':
        return {
          label: 'Technical',
          class: 'bg-indigo-100 text-indigo-800'
        };
      default:
        return {
          label: 'Professional',
          class: 'bg-slate-100 text-slate-800'
        };
    }
  };

  return {
    getAchievements,
    getAchievementCategory,
  };
}