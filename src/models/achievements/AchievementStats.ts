export interface AchievementStat {
  id: string;
  value: string;
  label: string;
  color: string;
}

export const achievementStatsA: AchievementStat[] = [
  {
    id: 'years-service',
    value: '37+',
    label: 'Years Service',
    color: 'text-blue-600'
  },
  {
    id: 'cases-analyzed',
    value: '26+',
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

export const achievementStatsB: AchievementStat[] = [
  {
    id: 'years-experience',
    value: '37+',
    label: 'Years Experience',
    color: 'text-secondary-400'
  },
  {
    id: 'high-profile-cases',
    value: '26+',
    label: 'High Profile Cases',
    color: 'text-secondary-400'
  },
  {
    id: 'management-years',
    value: '30',
    label: 'Management Years',
    color: 'text-secondary-400'
  },
  {
    id: 'success-rate',
    value: '100%',
    label: 'Success Rate',
    color: 'text-secondary-400'
  }
];
