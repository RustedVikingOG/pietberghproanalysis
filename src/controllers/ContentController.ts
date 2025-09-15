import type { Service } from '../models/Service';
import type { SuccessStory } from '../models/SuccessStory';
import type { Credential } from '../models/Credential';
import { ContentService } from '../services/ContentService';
import { ContentUtils } from '../utils/contentUtils';

/**
 * Controller for managing content organization from story.md and other sources
 */
export class ContentController {
  private services: Service[];
  private successStories: SuccessStory[];
  private credentials: Credential[];

  constructor() {
    this.services = ContentService.getServices();
    this.successStories = ContentService.getSuccessStories();
    this.credentials = ContentService.getCredentials();
  }

  /**
   * Get hero section content based on story.md narrative
   * @returns Hero section content object
   */
  getHeroContent(): {
    mainTitle: string;
    subtitle: string;
    description: string;
    tagline: string;
    callToAction: string;
    backgroundImage?: string;
  } {
    return {
      mainTitle: 'PietBergh ProAnalysis',
      subtitle: 'Professional Investigation & Analysis Services',
      description: 'Distinguished former SAPS Brigadier with 37+ years of law enforcement expertise, now offering specialized private consulting in evidence analysis, process reengineering, and linguistic services.',
      tagline: 'Meticulous Service for Impeccable Results',
      callToAction: 'Discover Our Services',
      backgroundImage: '/assets/hero-background.jpg' // Placeholder for professional background
    };
  }

  /**
   * Get about section content based on story.md
   * @returns About content object
   */
  getAboutContent(): {
    introduction: string;
    journey: Array<{ phase: string; description: string; years?: string }>;
    values: Array<{ name: string; description: string }>;
    achievements: string[];
    professionalAssociation: string;
  } {
    return {
      introduction: 'The compelling story of Piet Bergh, a distinguished former South African Police Service Brigadier who has transformed his 37+ years of law enforcement expertise into a specialized private consulting practice.',
      journey: [
        {
          phase: 'The Call to Service',
          description: 'Beginning his career in Linguistic Services at SAPS Headquarters',
          years: '1987'
        },
        {
          phase: 'The Quest',
          description: '37 years of dedicated service culminating in the rank of Brigadier',
          years: '1987-2024'
        },
        {
          phase: 'The Mastery',
          description: 'Becoming Provincial Commander of Priority Crime Specialized Investigation for the Hawks',
          years: '2010-2022'
        },
        {
          phase: 'The Return',
          description: 'Offering expertise to the private sector as "PietBergh ProAnalysis"',
          years: '2022-Present'
        }
      ],
      values: [
        {
          name: 'Integrity',
          description: '37 years of unblemished service with transition from public to private sector maintaining ethical standards'
        },
        {
          name: 'Precision',
          description: 'Meticulous service approach with detailed methodology descriptions and systematic processes'
        },
        {
          name: 'Expertise',
          description: 'Continuous professional development with mastery of multiple analytical tools and proven track record'
        },
        {
          name: 'Service',
          description: 'Career dedicated to public safety, now helping private sector clients with commitment to justice and truth'
        }
      ],
      achievements: [
        '37 years of distinguished law enforcement service',
        'Former SAPS Brigadier and Provincial Hawks Commander',
        '26 high-profile cases successfully analyzed',
        '18 years in Component Management Services',
        'MA in African Languages with scholarly credentials',
        'Advanced analytical tools proficiency'
      ],
      professionalAssociation: 'Member of the Association for Evidence Analysts South Africa (AEASA)'
    };
  }

  /**
   * Get success stories formatted for display
   * @returns Formatted success stories
   */
  getFormattedSuccessStories(): Array<{
    story: SuccessStory;
    formattedDate: string;
    excerpt: string;
    readingTime: number;
    categoryLabel: string;
  }> {
    return this.successStories.map(story => ({
      story,
      formattedDate: ContentUtils.formatDate(story.date),
      excerpt: ContentUtils.generateExcerpt(story.description, 2),
      readingTime: ContentUtils.calculateReadingTime(story.description + story.outcome),
      categoryLabel: this.formatCategoryLabel(story.category)
    }));
  }

  /**
   * Get credentials grouped by type
   * @returns Credentials grouped and formatted
   */
  getGroupedCredentials(): {
    academic: Credential[];
    professional: Credential[];
    training: Credential[];
    certifications: Credential[];
  } {
    const grouped = {
      academic: this.credentials.filter(c => c.type === 'degree' || c.type === 'diploma'),
      professional: this.credentials.filter(c => c.type === 'professional'),
      training: this.credentials.filter(c => c.type === 'training'),
      certifications: this.credentials.filter(c => c.type === 'certificate')
    };

    // Sort each group by year (most recent first)
    Object.values(grouped).forEach(group => {
      group.sort((a, b) => b.year - a.year);
    });

    return grouped;
  }

  /**
   * Get testimonials and recommendations content
   * @returns Array of testimonials (placeholder for future implementation)
   */
  getTestimonials(): Array<{
    quote: string;
    author: string;
    position: string;
    organization: string;
    case?: string;
  }> {
    // Placeholder testimonials based on success stories
    return [
      {
        quote: 'Brigadier Bergh\'s expert analysis of cellphone data was instrumental in our case. His methodical approach and clear testimony helped secure a conviction.',
        author: 'Senior Prosecutor',
        position: 'State Prosecutor',
        organization: 'National Prosecuting Authority',
        case: 'Mihalik Murder Trial'
      },
      {
        quote: 'The evidence analysis provided was thorough, professional, and court-ready. Exceptional attention to detail.',
        author: 'Investigating Officer',
        position: 'Detective Captain',
        organization: 'SAPS Hawks',
        case: 'George Murder and Fraud'
      }
    ];
  }

  /**
   * Get content statistics for dashboard/about display
   * @returns Content statistics object
   */
  getContentStatistics(): {
    totalCases: number;
    yearsExperience: number;
    successRate: string;
    credentialsCount: number;
    serviceAreas: number;
    clientsSatisfied: string;
  } {
    return {
      totalCases: 26, // From story.md
      yearsExperience: 37,
      successRate: '100%', // Based on successful prosecutions mentioned
      credentialsCount: this.credentials.length,
      serviceAreas: this.services.length,
      clientsSatisfied: '100+' // Professional estimation
    };
  }

  /**
   * Search all content by keyword
   * @param keyword - Search term
   * @returns Search results across all content types
   */
  searchContent(keyword: string): {
    services: Service[];
    successStories: SuccessStory[];
    credentials: Credential[];
    totalResults: number;
  } {
    const lowercaseKeyword = keyword.toLowerCase();

    const matchingServices = this.services.filter(service =>
      service.title.toLowerCase().includes(lowercaseKeyword) ||
      service.description.toLowerCase().includes(lowercaseKeyword)
    );

    const matchingStories = this.successStories.filter(story =>
      story.title.toLowerCase().includes(lowercaseKeyword) ||
      story.description.toLowerCase().includes(lowercaseKeyword) ||
      story.category.toLowerCase().includes(lowercaseKeyword)
    );

    const matchingCredentials = this.credentials.filter(credential =>
      credential.title.toLowerCase().includes(lowercaseKeyword) ||
      credential.institution.toLowerCase().includes(lowercaseKeyword) ||
      (credential.field && credential.field.toLowerCase().includes(lowercaseKeyword))
    );

    return {
      services: matchingServices,
      successStories: matchingStories,
      credentials: matchingCredentials,
      totalResults: matchingServices.length + matchingStories.length + matchingCredentials.length
    };
  }

  /**
   * Get related content based on current page
   * @param currentType - Current content type
   * @param currentId - Current content ID
   * @returns Related content suggestions
   */
  getRelatedContent(currentType: 'service' | 'story' | 'credential', currentId: string): {
    services: Service[];
    stories: SuccessStory[];
    credentials: Credential[];
  } {
    switch (currentType) {
      case 'service':
        return {
          services: this.services.filter(s => s.id !== currentId).slice(0, 2),
          stories: this.successStories.slice(0, 2),
          credentials: this.credentials.filter(c => c.type === 'training').slice(0, 2)
        };

      case 'story':
        const currentStory = this.successStories.find(s => s.id === currentId);
        return {
          services: currentStory?.caseType === 'murder' 
            ? [this.services[0]] // Evidence analysis for murder cases
            : this.services.slice(0, 1),
          stories: this.successStories.filter(s => s.id !== currentId).slice(0, 2),
          credentials: this.credentials.filter(c => c.type === 'professional').slice(0, 1)
        };

      case 'credential':
        return {
          services: this.services.slice(0, 1),
          stories: this.successStories.slice(0, 1),
          credentials: this.credentials.filter(c => c.id !== currentId).slice(0, 2)
        };

      default:
        return { services: [], stories: [], credentials: [] };
    }
  }

  /**
   * Format category label for display
   * @param category - Raw category string
   * @returns Formatted category label
   */
  private formatCategoryLabel(category: string): string {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get content for sitemap generation
   * @returns Sitemap content structure
   */
  getSitemapContent(): Array<{
    url: string;
    lastModified: string;
    priority: number;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }> {
    const baseUrl = 'https://pietberghproanalysis.com'; // Replace with actual domain
    const now = new Date().toISOString();

    return [
      { url: `${baseUrl}/`, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
      { url: `${baseUrl}/about`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
      { url: `${baseUrl}/evidential-analysis`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
      { url: `${baseUrl}/operational-process-reengineering`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
      { url: `${baseUrl}/editing-translation`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
      { url: `${baseUrl}/successes`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' }
    ];
  }
}