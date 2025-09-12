/**
 * Interface for case study data and success stories
 */
export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  outcome: string;
  evidence: string[];
  date: string;
  category: string;
  mediaLink?: string;
  caseType: 'murder' | 'fraud' | 'cash-in-transit' | 'corruption' | 'other';
  location?: string;
}