export interface AchievementStat {
  id: string;
  value: string;
  label: string;
  color: string;
}

export const achievementStats: AchievementStat[] = [
  {
    id: 'years-service',
    value: '37+',
    label: 'Years Service',
    color: 'text-blue-600'
  },
  {
    id: 'cases-analyzed',
    value: '26',
    label: 'Cases Analyzed',
    color: 'text-amber-600'
  },
  {
    id: 'managerial-years',
    value: '30',
    label: 'Years in managerial positions',
    color: 'text-green-600'
  },
  {
    id: 'unblemished-record',
    value: '100%',
    label: 'Unblemished Record',
    color: 'text-purple-600'
  }
];
