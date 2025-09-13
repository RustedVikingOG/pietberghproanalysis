import type { SuccessStory } from '../models/SuccessStory';
import { ContentService } from '../services/ContentService';

/**
 * Controller for managing portfolio content and case studies
 * Handles business logic for portfolio display, filtering, and organization
 */
export class PortfolioController {
  private successStories: SuccessStory[];
  
  // Configuration constants
  private static readonly FEATURED_CASE_CUTOFF_DATE = '2022-01-01';

  constructor() {
    this.successStories = ContentService.getSuccessStories();
  }

  /**
   * Get all portfolio items (success stories)
   * @returns Array of success stories
   */
  getPortfolioItems(): SuccessStory[] {
    return this.successStories;
  }

  /**
   * Get portfolio items filtered by category
   * @param category Category to filter by
   * @returns Filtered array of success stories
   */
  getPortfolioItemsByCategory(category: string): SuccessStory[] {
    if (!category || category === 'all') {
      return this.successStories;
    }
    return this.successStories.filter(story => 
      story.category.toLowerCase().includes(category.toLowerCase()) ||
      story.caseType === category
    );
  }

  /**
   * Get featured portfolio items for hero display
   * @param limit Number of featured cases to return
   * @returns Array of featured success stories
   */
  getFeaturedCases(limit: number = 2): SuccessStory[] {
    // Return most recent cases or cases with media links as featured
    return this.successStories
      .filter(story => story.mediaLink || story.date >= PortfolioController.FEATURED_CASE_CUTOFF_DATE)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  /**
   * Get portfolio items filtered by case type
   * @param caseType Case type to filter by
   * @returns Filtered array of success stories
   */
  getPortfolioItemsByCaseType(caseType: SuccessStory['caseType']): SuccessStory[] {
    return this.successStories.filter(story => story.caseType === caseType);
  }

  /**
   * Get unique categories from all portfolio items
   * @returns Array of unique categories
   */
  getAvailableCategories(): string[] {
    const categories = this.successStories.map(story => story.category);
    return [...new Set(categories)];
  }

  /**
   * Get unique case types from all portfolio items
   * @returns Array of unique case types
   */
  getAvailableCaseTypes(): SuccessStory['caseType'][] {
    const caseTypes = this.successStories.map(story => story.caseType);
    return [...new Set(caseTypes)];
  }

  /**
   * Get portfolio statistics
   * @returns Object with portfolio metrics
   */
  getPortfolioStats(): {
    totalCases: number;
    caseTypes: Record<SuccessStory['caseType'], number>;
    successRate: string;
    yearsActive: number;
  } {
    const caseTypes = this.successStories.reduce((acc, story) => {
      acc[story.caseType] = (acc[story.caseType] || 0) + 1;
      return acc;
    }, {} as Record<SuccessStory['caseType'], number>);

    // Calculate years active based on date range
    const dates = this.successStories.map(story => new Date(story.date).getFullYear());
    const minYear = Math.min(...dates);
    const maxYear = Math.max(...dates);
    const yearsActive = maxYear - minYear + 1;

    return {
      totalCases: this.successStories.length,
      caseTypes,
      successRate: '100%', // All listed cases are successful
      yearsActive
    };
  }

  /**
   * Get hero content for portfolio page
   * @returns Hero section data
   */
  getPortfolioHero(): {
    mainTitle: string;
    subtitle: string;
    description: string;
    tagline: string;
    callToAction: string;
  } {
    const stats = this.getPortfolioStats();
    
    return {
      mainTitle: 'Portfolio of Success',
      subtitle: 'Case Studies & Proven Results',
      description: `Explore ${stats.totalCases} high-profile cases spanning ${stats.yearsActive} years of investigative excellence. From murder trials to corruption cases, discover how meticulous analysis delivers justice.`,
      tagline: 'Evidence-Based Results That Stand in Court',
      callToAction: 'View Case Studies'
    };
  }

  /**
   * Search portfolio items by text query
   * @param query Search query
   * @returns Filtered array of success stories
   */
  searchPortfolioItems(query: string): SuccessStory[] {
    if (!query.trim()) {
      return this.successStories;
    }

    const searchTerm = query.toLowerCase();
    return this.successStories.filter(story =>
      story.title.toLowerCase().includes(searchTerm) ||
      story.description.toLowerCase().includes(searchTerm) ||
      story.outcome.toLowerCase().includes(searchTerm) ||
      story.category.toLowerCase().includes(searchTerm) ||
      story.location?.toLowerCase().includes(searchTerm)
    );
  }
}