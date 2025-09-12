import type { AboutContent, JourneyPhase, CoreValue } from '../models/AboutContent';
import type { Credential } from '../models/Credential';
import { ContentController } from './ContentController';

/**
 * Controller for managing About page business logic and data orchestration
 */
export class AboutController {
  private contentController: ContentController;

  constructor() {
    this.contentController = new ContentController();
  }

  /**
   * Get complete About page data with proper typing
   * @returns Promise<AboutContent> Complete about page data
   */
  async getAboutPageData(): Promise<AboutContent> {
    try {
      const aboutData = this.contentController.getAboutContent();
      
      // Transform the raw data to match our typed interface
      const typedAboutData: AboutContent = {
        introduction: aboutData.introduction,
        journey: aboutData.journey.map(phase => ({
          phase: phase.phase,
          description: phase.description,
          years: phase.years,
          icon: this.getPhaseIcon(phase.phase)
        })),
        values: aboutData.values.map(value => ({
          name: value.name,
          description: value.description,
          icon: this.getValueIcon(value.name)
        })),
        achievements: aboutData.achievements,
        professionalAssociation: aboutData.professionalAssociation
      };

      return typedAboutData;
    } catch (error) {
      console.error('Error fetching about page data:', error);
      throw new Error('Failed to load about page content');
    }
  }

  /**
   * Get formatted credentials grouped by type
   * @returns Grouped credentials for display
   */
  getFormattedCredentials(): {
    academic: Credential[];
    professional: Credential[];
    training: Credential[];
    certifications: Credential[];
  } {
    return this.contentController.getGroupedCredentials();
  }

  /**
   * Get journey phases with enhanced metadata
   * @returns Promise<JourneyPhase[]> Enhanced journey phases
   */
  async getJourneyPhases(): Promise<JourneyPhase[]> {
    const aboutData = await this.getAboutPageData();
    return aboutData.journey;
  }

  /**
   * Get core values with enhanced metadata
   * @returns Promise<CoreValue[]> Enhanced core values
   */
  async getCoreValues(): Promise<CoreValue[]> {
    const aboutData = await this.getAboutPageData();
    return aboutData.values;
  }

  /**
   * Get icon name for journey phase
   * @param phaseName - Name of the journey phase
   * @returns Icon identifier
   */
  private getPhaseIcon(phaseName: string): string {
    const iconMap: Record<string, string> = {
      'The Call to Service': 'shield-check',
      'The Quest': 'academic-cap',
      'The Mastery': 'star',
      'The Return': 'briefcase'
    };
    
    return iconMap[phaseName] || 'circle';
  }

  /**
   * Get icon name for core value
   * @param valueName - Name of the core value
   * @returns Icon identifier
   */
  private getValueIcon(valueName: string): string {
    const iconMap: Record<string, string> = {
      'Integrity': 'shield-check',
      'Precision': 'magnifying-glass',
      'Expertise': 'academic-cap',
      'Service': 'heart'
    };
    
    return iconMap[valueName] || 'star';
  }

  /**
   * Calculate years of service from start year
   * @param startYear - Starting year of service
   * @returns Number of years of service
   */
  calculateYearsOfService(startYear: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  /**
   * Get professional summary statistics
   * @returns Key statistics for hero section
   */
  getProfessionalStats(): {
    yearsOfService: number;
    rank: string;
    casesAnalyzed: number;
    specialization: string;
  } {
    return {
      yearsOfService: 37,
      rank: 'Brigadier (Retired)',
      casesAnalyzed: 26,
      specialization: 'Evidence Analysis & Investigation'
    };
  }
}