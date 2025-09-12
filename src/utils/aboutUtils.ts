import type { Credential } from '../models/Credential';
import type { JourneyPhase, CoreValue } from '../models/AboutContent';

/**
 * Utility functions for About page data formatting and manipulation
 */
export class AboutUtils {
  /**
   * Format credentials grouped by type for display
   * @param credentials - Array of credentials
   * @returns Credentials grouped by type
   */
  static formatCredentialsByType(credentials: Credential[]): {
    academic: Credential[];
    professional: Credential[];
    training: Credential[];
    certifications: Credential[];
  } {
    const grouped = {
      academic: credentials.filter(c => c.type === 'degree' || c.type === 'diploma'),
      professional: credentials.filter(c => c.type === 'professional'),
      training: credentials.filter(c => c.type === 'training'),
      certifications: credentials.filter(c => c.type === 'certificate')
    };

    // Sort each group by year (most recent first)
    Object.values(grouped).forEach(group => {
      group.sort((a, b) => b.year - a.year);
    });

    return grouped;
  }

  /**
   * Calculate years of service from start year to current year
   * @param startYear - Starting year of service
   * @returns Number of years of service
   */
  static calculateYearsOfService(startYear: number): number {
    const currentYear = new Date().getFullYear();
    return Math.max(0, currentYear - startYear);
  }

  /**
   * Sort credentials by year (most recent first)
   * @param credentials - Array of credentials to sort
   * @returns Sorted credentials array
   */
  static sortCredentialsByYear(credentials: Credential[]): Credential[] {
    return [...credentials].sort((a, b) => b.year - a.year);
  }

  /**
   * Format journey year range for display
   * @param years - Year range string (e.g., "1985-2022")
   * @returns Formatted year string
   */
  static formatJourneyYear(years: string): string {
    if (!years) return '';
    
    // Handle single year
    if (!years.includes('-')) {
      return years;
    }

    // Handle year ranges
    const [startYear, endYear] = years.split('-');
    if (endYear?.toLowerCase().includes('present')) {
      return `${startYear} - Present`;
    }
    
    return `${startYear} - ${endYear}`;
  }

  /**
   * Calculate timeline progress for visual representation
   * @param journeyPhases - Array of journey phases
   * @returns Progress percentages for each phase
   */
  static calculateTimelineProgress(journeyPhases: JourneyPhase[]): number[] {
    const totalPhases = journeyPhases.length;
    return journeyPhases.map((_, index) => ((index + 1) / totalPhases) * 100);
  }

  /**
   * Get display-friendly credential type label
   * @param type - Credential type
   * @returns Human-readable type label
   */
  static getCredentialTypeLabel(type: Credential['type']): string {
    const labelMap: Record<Credential['type'], string> = {
      degree: 'Academic Degree',
      diploma: 'Diploma',
      certificate: 'Certificate',
      professional: 'Professional Qualification',
      training: 'Training & Development'
    };
    
    return labelMap[type] || type;
  }

  /**
   * Generate a short excerpt from a description
   * @param description - Full description text
   * @param sentences - Number of sentences to include in excerpt
   * @returns Short excerpt
   */
  static generateExcerpt(description: string, sentences: number = 1): string {
    if (!description) return '';
    
    const sentenceArray = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentenceArray.slice(0, sentences).join('. ').trim() + (sentenceArray.length > sentences ? '...' : '');
  }

  /**
   * Format years of experience for display
   * @param years - Number of years
   * @returns Formatted string with proper pluralization
   */
  static formatYearsOfExperience(years: number): string {
    if (years === 0) return 'New';
    if (years === 1) return '1 year';
    return `${years} years`;
  }

  /**
   * Check if a credential is recent (within last 5 years)
   * @param credential - Credential to check
   * @returns True if credential is recent
   */
  static isRecentCredential(credential: Credential): boolean {
    const currentYear = new Date().getFullYear();
    return (currentYear - credential.year) <= 5;
  }

  /**
   * Group credentials by institution
   * @param credentials - Array of credentials
   * @returns Credentials grouped by institution
   */
  static groupCredentialsByInstitution(credentials: Credential[]): Record<string, Credential[]> {
    return credentials.reduce((groups, credential) => {
      const institution = credential.institution;
      if (!groups[institution]) {
        groups[institution] = [];
      }
      groups[institution].push(credential);
      return groups;
    }, {} as Record<string, Credential[]>);
  }

  /**
   * Validate journey phase data structure
   * @param phase - Journey phase to validate
   * @returns True if valid
   */
  static isValidJourneyPhase(phase: any): phase is JourneyPhase {
    return (
      typeof phase === 'object' &&
      typeof phase.phase === 'string' &&
      typeof phase.description === 'string' &&
      (phase.years === undefined || typeof phase.years === 'string') &&
      (phase.icon === undefined || typeof phase.icon === 'string')
    );
  }

  /**
   * Validate core value data structure
   * @param value - Core value to validate
   * @returns True if valid
   */
  static isValidCoreValue(value: any): value is CoreValue {
    return (
      typeof value === 'object' &&
      typeof value.name === 'string' &&
      typeof value.description === 'string' &&
      (value.icon === undefined || typeof value.icon === 'string')
    );
  }
}