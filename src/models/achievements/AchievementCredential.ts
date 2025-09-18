export interface Credential {
  id: string;
  icon: string; // Lucide icon name as string for dynamic import
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export const credentials: Credential[] = [
  {
    id: 'academic-excellence',
    icon: 'GraduationCap',
    title: 'Academic Excellence',
    description: 'MA in African Languages with scholarly credentials',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'professional-training',
    icon: 'CheckCircle2',
    title: 'Professional Training',
    description: 'Specialized law enforcement and analytical training',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 'advanced-tools',
    icon: 'Zap',
    title: 'Advanced Tools',
    description: 'Proficiency in cutting-edge analytical tools and methodologies',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];