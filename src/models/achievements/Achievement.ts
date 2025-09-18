export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'leadership' | 'casework' | 'academic' | 'technical' | 'professional';
}

export const achievements: Achievement[] = [
  {
    id: 'brigadier-rank',
    title: 'Brigadier Rank Attainment',
    description: 'Achieved the rank of Brigadier in the South African Police Service, demonstrating exceptional leadership and operational excellence.',
    category: 'leadership'
  },
  {
    id: 'provincial-commander',
    title: 'Provincial Commander Role',
    description: 'Served as Provincial Commander of the Hawks, overseeing complex investigations and strategic operations across multiple regions.',
    category: 'leadership'
  },
  {
    id: 'high-profile-cases',
    title: 'High-Profile Case Management',
    description: 'Successfully managed 26 high-profile cases, including complex fraud investigations and organized crime operations.',
    category: 'casework'
  },
  {
    id: 'decades-service',
    title: '37+ Years of Dedicated Service',
    description: 'Over three decades of unwavering commitment to law enforcement excellence and public service.',
    category: 'service'
  },
  {
    id: 'academic-excellence',
    title: 'Academic Achievement',
    description: 'Master of Arts in African Languages, establishing scholarly credibility alongside practical expertise.',
    category: 'academic'
  },
  {
    id: 'advanced-training',
    title: 'Advanced Investigative Training',
    description: 'Specialized training in advanced analytical tools including Analyst Notebook, i2 iBase, and TextChart software.',
    category: 'technical'
  }
];