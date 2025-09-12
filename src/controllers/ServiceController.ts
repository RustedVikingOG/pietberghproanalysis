import type { Service } from '../models/Service';
import { ContentService } from '../services/ContentService';

/**
 * Controller for managing service information and presentation
 */
export class ServiceController {
  private services: Service[];

  constructor() {
    this.services = ContentService.getServices();
  }

  /**
   * Get all available services
   * @returns Array of all services
   */
  getServices(): Service[] {
    return this.services;
  }

  /**
   * Get service by ID
   * @param id - Service ID to find
   * @returns Service object or null if not found
   */
  getServiceById(id: string): Service | null {
    return this.services.find(service => service.id === id) || null;
  }

  /**
   * Get service by category
   * @param category - Service category
   * @returns Service object or null if not found
   */
  getServiceByCategory(category: Service['category']): Service | null {
    return this.services.find(service => service.category === category) || null;
  }

  /**
   * Get services for homepage display (featured/summary)
   * @returns Array of services with summary information
   */
  getFeaturedServices(): Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    icon?: string;
    route: string;
  }> {
    return this.services.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon,
      route: this.getServiceRoute(service.category)
    }));
  }

  /**
   * Get service route based on category
   * @param category - Service category
   * @returns Route path for the service
   */
  getServiceRoute(category: Service['category']): string {
    const routes: Record<Service['category'], string> = {
      'evidence-analysis': '/evidential-analysis',
      'process-reengineering': '/operational-process-reengineering',
      'editing-translation': '/editing-translation'
    };

    return routes[category];
  }

  /**
   * Get service features and benefits for detailed pages
   * @param serviceId - Service ID
   * @returns Formatted service details or null
   */
  getServiceDetails(serviceId: string): {
    service: Service;
    formattedFeatures: Array<{ title: string; description: string }>;
    formattedBenefits: Array<{ title: string; description: string }>;
    methodology?: string[];
    tools?: string[];
  } | null {
    const service = this.getServiceById(serviceId);
    
    if (!service) {
      return null;
    }

    return {
      service,
      formattedFeatures: service.features.map((feature, index) => ({
        title: `Feature ${index + 1}`,
        description: feature
      })),
      formattedBenefits: service.benefits.map((benefit, index) => ({
        title: `Benefit ${index + 1}`,
        description: benefit
      })),
      methodology: service.methodology,
      tools: service.tools
    };
  }

  /**
   * Get service statistics for display
   * @returns Service statistics object
   */
  getServiceStatistics(): {
    totalServices: number;
    categoriesCount: number;
    experienceYears: number;
    highlightedFeatures: string[];
  } {
    const categories = new Set(this.services.map(s => s.category));
    
    return {
      totalServices: this.services.length,
      categoriesCount: categories.size,
      experienceYears: 37, // From story.md - Piet's years of experience
      highlightedFeatures: [
        '26 high-profile cases',
        '18 years in management',
        'Advanced analytical tools',
        'Court-ready expertise'
      ]
    };
  }

  /**
   * Search services by keyword
   * @param keyword - Search keyword
   * @returns Array of matching services
   */
  searchServices(keyword: string): Service[] {
    const lowercaseKeyword = keyword.toLowerCase();
    
    return this.services.filter(service => 
      service.title.toLowerCase().includes(lowercaseKeyword) ||
      service.description.toLowerCase().includes(lowercaseKeyword) ||
      service.features.some(feature => feature.toLowerCase().includes(lowercaseKeyword)) ||
      service.benefits.some(benefit => benefit.toLowerCase().includes(lowercaseKeyword))
    );
  }

  /**
   * Get related services (exclude current service)
   * @param currentServiceId - Current service ID to exclude
   * @returns Array of related services
   */
  getRelatedServices(currentServiceId: string): Service[] {
    return this.services.filter(service => service.id !== currentServiceId);
  }

  /**
   * Validate service category
   * @param category - Category to validate
   * @returns Boolean indicating if category is valid
   */
  isValidCategory(category: string): category is Service['category'] {
    const validCategories: Service['category'][] = [
      'evidence-analysis',
      'process-reengineering', 
      'editing-translation'
    ];
    
    return validCategories.includes(category as Service['category']);
  }

  /**
   * Get service category display name
   * @param category - Service category
   * @returns User-friendly display name
   */
  getCategoryDisplayName(category: Service['category']): string {
    const displayNames: Record<Service['category'], string> = {
      'evidence-analysis': 'Evidence & Communication Analysis',
      'process-reengineering': 'Operational Process Reengineering',
      'editing-translation': 'Editing & Translation'
    };

    return displayNames[category];
  }
}