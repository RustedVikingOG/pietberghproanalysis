import { PageController } from './PageController';
import { ServiceController } from './ServiceController';
import { ContactController } from './ContactController';
import { ContentController } from './ContentController';
import type { Page } from '../models/Page';
import type { Service } from '../models/Service';
import type { ContactFormData } from '../models/ContactForm';

/**
 * Master business controller that orchestrates all business logic
 * Provides a unified interface for the application's business operations
 */
export class BusinessController {
  private pageController: PageController;
  private serviceController: ServiceController;
  private contactController: ContactController;
  private contentController: ContentController;

  constructor() {
    this.pageController = new PageController();
    this.serviceController = new ServiceController();
    this.contactController = new ContactController();
    this.contentController = new ContentController();
  }

  // ========== Page Management ==========

  /**
   * Initialize page based on route
   * @param route - Current route
   * @returns Page metadata and content
   */
  async initializePage(route: string): Promise<{
    page: Page | null;
    metadata: {
      title: string;
      description: string;
      keywords: string;
    };
    content: any;
  }> {
    // Set current page
    const success = this.pageController.setCurrentPage(route);
    const page = this.pageController.getCurrentPage();
    
    if (!success || !page) {
      return {
        page: null,
        metadata: {
          title: 'Page Not Found - PietBergh ProAnalysis',
          description: 'The requested page could not be found.',
          keywords: 'error, not found'
        },
        content: null
      };
    }

    // Get page metadata
    const metadata = {
      title: page.title,
      description: page.description,
      keywords: page.metadata.keywords.join(', ')
    };

    // Get page-specific content
    const content = await this.getPageContent(route);

    return { page, metadata, content };
  }

  /**
   * Get content specific to a page
   * @param route - Page route
   * @returns Page-specific content
   */
  private async getPageContent(route: string): Promise<any> {
    switch (route) {
      case '/':
        return this.getHomePageContent();
      case '/about':
        return this.getAboutPageContent();
      case '/evidential-analysis':
        return this.getServicePageContent('evidential-analysis');
      case '/operational-process-reengineering':
        return this.getServicePageContent('operational-process-reengineering');
      case '/editing-translation':
        return this.getServicePageContent('editing-translation');
      case '/successes':
        return this.getSuccessesPageContent();
      default:
        return null;
    }
  }

  /**
   * Get home page content bundle
   * @returns Complete home page content
   */
  private getHomePageContent() {
    return {
      hero: this.contentController.getHeroContent(),
      services: this.serviceController.getFeaturedServices(),
      about: this.contentController.getAboutSummary(),
      testimonials: this.contentController.getFeaturedTestimonials(),
      stats: this.getBusinessStats()
    };
  }

  /**
   * Get about page content bundle
   * @returns Complete about page content
   */
  private getAboutPageContent() {
    return {
      about: this.contentController.getAboutContent(),
      credentials: this.contentController.getCredentials(),
      timeline: this.contentController.getCareerTimeline(),
      values: this.contentController.getCoreValues()
    };
  }

  /**
   * Get service page content bundle
   * @param serviceId - Service identifier
   * @returns Complete service page content
   */
  private getServicePageContent(serviceId: string) {
    return {
      service: this.serviceController.getServiceById(serviceId),
      details: this.serviceController.getServiceDetails(serviceId),
      caseStudies: this.contentController.getServiceCaseStudies(serviceId),
      qualifications: this.serviceController.getServiceQualifications(serviceId),
      pricing: this.serviceController.getServicePricing(serviceId),
      contactInfo: this.serviceController.getServiceContactInfo(serviceId)
    };
  }

  /**
   * Get successes page content bundle
   * @returns Complete successes page content
   */
  private getSuccessesPageContent() {
    return {
      successStories: this.contentController.getSuccessStories(),
      statistics: this.getBusinessStats(),
      testimonials: this.contentController.getTestimonials(),
      caseStudies: this.contentController.getCaseStudiesByCategory()
    };
  }

  // ========== Business Statistics ==========

  /**
   * Get business statistics for display
   * @returns Key business metrics
   */
  private getBusinessStats() {
    return {
      yearsOfExperience: '37+',
      highProfileCases: '26+',
      managementYears: '18',
      successRate: '100%',
      professionalCertifications: '8+',
      languagesSupported: '3'
    };
  }

  // ========== Navigation and Routing ==========

  /**
   * Get navigation structure for the application
   * @returns Complete navigation structure
   */
  getNavigationStructure(): {
    main: Array<{ title: string; route: string; label: string }>;
    services: Array<{ title: string; route: string; description: string }>;
    footer: Array<{ title: string; route: string }>;
  } {
    const mainNav = this.pageController.getNavigationItems();
    const services = this.serviceController.getAllServices().map(service => ({
      title: service.title,
      route: this.getServiceRoute(service.id),
      description: service.description
    }));

    return {
      main: mainNav,
      services,
      footer: mainNav.filter(item => item.route !== '/') // Exclude home from footer
    };
  }

  /**
   * Get route for a service
   * @param serviceId - Service identifier
   * @returns Service route
   */
  private getServiceRoute(serviceId: string): string {
    const routes: Record<string, string> = {
      'evidential-analysis': '/evidential-analysis',
      'operational-process-reengineering': '/operational-process-reengineering',
      'editing-translation': '/editing-translation'
    };
    return routes[serviceId] || '/services';
  }

  // ========== Contact Management ==========

  /**
   * Handle contact form submission
   * @param formData - Contact form data
   * @returns Submission result
   */
  async submitContactForm(formData: ContactFormData) {
    return await this.contactController.submitContactForm(formData);
  }

  /**
   * Validate contact form
   * @param formData - Contact form data
   * @returns Validation result
   */
  validateContactForm(formData: ContactFormData) {
    return this.contactController.validateForm(formData);
  }

  /**
   * Get contact information
   * @returns Contact details
   */
  getContactInfo() {
    return this.contactController.getContactInfo();
  }

  // ========== Search and Discovery ==========

  /**
   * Search across all content
   * @param query - Search query
   * @returns Search results
   */
  searchContent(query: string): {
    pages: Page[];
    services: Service[];
    stories: any[];
  } {
    return {
      pages: this.pageController.searchPages(query),
      services: this.serviceController.searchServices(query),
      stories: this.contentController.searchSuccessStories(query)
    };
  }

  // ========== Analytics and Insights ==========

  /**
   * Get business insights for dashboard
   * @returns Business insights
   */
  getBusinessInsights() {
    return {
      mostPopularService: this.getMostPopularService(),
      recentCaseStudies: this.contentController.getRecentSuccessStories(3),
      upcomingEvents: this.getUpcomingEvents(),
      professionalMilestones: this.getProfessionalMilestones()
    };
  }

  /**
   * Get most popular service (placeholder for analytics)
   * @returns Most popular service
   */
  private getMostPopularService() {
    // In a real app, this would be based on analytics data
    return this.serviceController.getServiceById('evidential-analysis');
  }

  /**
   * Get upcoming events (placeholder)
   * @returns Upcoming events
   */
  private getUpcomingEvents() {
    return [
      {
        title: 'Professional Development Workshop',
        date: '2025-10-15',
        description: 'Advanced Evidence Analysis Techniques'
      }
    ];
  }

  /**
   * Get professional milestones
   * @returns Key milestones
   */
  private getProfessionalMilestones() {
    return [
      {
        year: '1985',
        title: 'Started Career in SAPS Linguistic Services'
      },
      {
        year: '2010',
        title: 'Appointed Provincial Commander - Hawks'
      },
      {
        year: '2022',
        title: 'Founded PietBergh ProAnalysis'
      },
      {
        year: '2025',
        title: 'Modernized Digital Presence'
      }
    ];
  }

  // ========== Utility Methods ==========

  /**
   * Check if the application is ready
   * @returns Boolean indicating readiness
   */
  isApplicationReady(): boolean {
    return (
      this.pageController !== null &&
      this.serviceController !== null &&
      this.contactController !== null &&
      this.contentController !== null
    );
  }

  /**
   * Get application status
   * @returns Application status object
   */
  getApplicationStatus() {
    return {
      ready: this.isApplicationReady(),
      services: this.serviceController.getAllServices().length,
      pages: this.pageController.getNavigationItems().length,
      stories: this.contentController.getSuccessStories().length,
      version: '1.0.0'
    };
  }
}