import type { Page } from '../models/Page';
import { ContentService } from '../services/ContentService';

/**
 * Controller for managing page navigation and metadata
 */
export class PageController {
  private pages: Page[];
  private currentPage: Page | null = null;

  constructor() {
    this.pages = ContentService.getPages();
  }

  /**
   * Get all available pages
   * @returns Array of all pages
   */
  getPages(): Page[] {
    return this.pages;
  }

  /**
   * Get page by route
   * @param route - Route path to find
   * @returns Page object or null if not found
   */
  getPageByRoute(route: string): Page | null {
    return this.pages.find(page => page.route === route) || null;
  }

  /**
   * Set current active page
   * @param route - Route of the page to set as current
   * @returns Boolean indicating success
   */
  setCurrentPage(route: string): boolean {
    const page = this.getPageByRoute(route);
    if (page) {
      this.currentPage = page;
      this.updatePageMetadata(page);
      return true;
    }
    return false;
  }

  /**
   * Get current active page
   * @returns Current page or null
   */
  getCurrentPage(): Page | null {
    return this.currentPage;
  }

  /**
   * Update document metadata for SEO
   * @param page - Page to update metadata for
   */
  private updatePageMetadata(page: Page): void {
    // Update document title
    document.title = page.title;

    // Update meta description
    this.updateMetaTag('description', page.description);

    // Update meta keywords
    this.updateMetaTag('keywords', page.metadata.keywords.join(', '));

    // Update meta author
    this.updateMetaTag('author', page.metadata.author);

    // Update Open Graph tags
    this.updateMetaTag('og:title', page.title);
    this.updateMetaTag('og:description', page.description);
    this.updateMetaTag('og:type', 'website');
  }

  /**
   * Update or create meta tag
   * @param name - Meta tag name
   * @param content - Meta tag content
   */
  private updateMetaTag(name: string, content: string): void {
    let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (name.startsWith('og:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      document.head.appendChild(metaTag);
    }
    
    metaTag.setAttribute('content', content);
  }

  /**
   * Get navigation items for menu
   * @returns Array of navigation items
   */
  getNavigationItems(): Array<{ title: string; route: string; label: string }> {
    return this.pages.map(page => ({
      title: page.title,
      route: page.route,
      label: this.getNavigationLabel(page.route)
    }));
  }

  /**
   * Get user-friendly navigation label from route
   * @param route - Route path
   * @returns User-friendly label
   */
  private getNavigationLabel(route: string): string {
    const labels: Record<string, string> = {
      '/': 'Home',
      '/about': 'About',
      '/evidential-analysis': 'Evidence Analysis',
      '/operational-process-reengineering': 'Process Reengineering',
      '/editing-translation': 'Editing & Translation',
      '/successes': 'Success Stories'
    };

    return labels[route] || route.replace(/^\//, '').replace(/-/g, ' ');
  }

  /**
   * Check if route is currently active
   * @param route - Route to check
   * @returns Boolean indicating if route is active
   */
  isActiveRoute(route: string): boolean {
    return this.currentPage?.route === route;
  }

  /**
   * Get breadcrumb navigation for current page
   * @returns Array of breadcrumb items
   */
  getBreadcrumbs(): Array<{ label: string; route: string; isActive: boolean }> {
    if (!this.currentPage) {
      return [];
    }

    const breadcrumbs = [
      { label: 'Home', route: '/', isActive: false }
    ];

    if (this.currentPage.route !== '/') {
      breadcrumbs.push({
        label: this.getNavigationLabel(this.currentPage.route),
        route: this.currentPage.route,
        isActive: true
      });
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  }
}