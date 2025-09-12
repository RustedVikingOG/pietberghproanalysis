/**
 * Interface for the three service offerings (Evidence Analysis, OPR, Translation)
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  category: 'evidence-analysis' | 'process-reengineering' | 'editing-translation';
  icon?: string;
  detailDescription?: string;
  methodology?: string[];
  tools?: string[];
}