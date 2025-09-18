/**
 * Interface for qualifications and certifications
 */
export interface Credential {
  id: string;
  type: 'degree' | 'diploma' | 'certificate' | 'professional' | 'training';
  title: string;
  institution: string;
  year: number;
  description?: string;
  level?: 'undergraduate' | 'postgraduate' | 'professional';
  field?: string;
}

export interface Achievement {
  title: string;
  description: string;
}