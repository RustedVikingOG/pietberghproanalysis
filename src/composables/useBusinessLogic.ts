import { ref, computed, readonly } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageController } from '../controllers/PageController';
import { ServiceController } from '../controllers/ServiceController';
import { ContactController } from '../controllers/ContactController';
import { ContentController } from '../controllers/ContentController';
import type { ContactFormData } from '../models/ContactForm';

/**
 * Composable for managing business logic and application state
 * Provides centralized business operations for the entire application
 */
export function useBusinessLogic() {
  const router = useRouter();
  const route = useRoute();

  // Controllers
  const pageController = new PageController();
  const serviceController = new ServiceController();
  const contactController = new ContactController();
  const contentController = new ContentController();

  // Application state
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPageData = ref<any>(null);

  // ========== Page Management ==========

  /**
   * Initialize page data based on current route
   */
  const initializePage = async (): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      const currentRoute = route.path;
      const success = pageController.setCurrentPage(currentRoute);
      
      if (!success) {
        throw new Error('Page not found');
      }

      // Get page-specific data
      currentPageData.value = await getPageData(currentRoute);
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get data specific to the current page
   * @param route - Current route path
   * @returns Page-specific data
   */
  const getPageData = async (route: string): Promise<any> => {
    switch (route) {
      case '/':
        return getHomePageData();
      case '/about':
        return getAboutPageData();
      case '/evidential-analysis':
      case '/operational-process-reengineering':
      case '/editing-translation':
        return getServicePageData(route);
      case '/successes':
        return getSuccessesPageData();
      default:
        return null;
    }
  };

  /**
   * Get home page data bundle
   */
  const getHomePageData = () => {
    return {
      hero: contentController.getHeroContent(),
      services: serviceController.getFeaturedServices(),
      about: contentController.getAboutContent(),
      stats: {
        yearsOfExperience: '37+',
        highProfileCases: '26+',
        managementYears: '18',
        successRate: '100%'
      }
    };
  };

  /**
   * Get about page data bundle
   */
  const getAboutPageData = () => {
    return {
      about: contentController.getAboutContent(),
      credentials: contentController.getGroupedCredentials(),
      stats: contentController.getContentStatistics()
    };
  };

  /**
   * Get service page data bundle
   * @param route - Service route
   */
  const getServicePageData = (route: string) => {
    const serviceId = getServiceIdFromRoute(route);
    return {
      service: serviceController.getServiceById(serviceId),
      details: serviceController.getServiceDetails(serviceId),
      relatedContent: contentController.getRelatedContent('service', serviceId)
    };
  };

  /**
   * Get successes page data bundle
   */
  const getSuccessesPageData = () => {
    return {
      successStories: contentController.getFormattedSuccessStories(),
      testimonials: contentController.getTestimonials(),
      stats: contentController.getContentStatistics()
    };
  };

  // ========== Navigation ==========

  /**
   * Get navigation structure
   */
  const getNavigation = () => {
    return pageController.getNavigationItems();
  };

  /**
   * Navigate to a specific page
   * @param path - Target path
   */
  const navigateToPage = async (path: string): Promise<void> => {
    try {
      await router.push(path);
      await initializePage();
    } catch (err) {
      error.value = 'Navigation failed';
    }
  };

  /**
   * Get current page information
   */
  const getCurrentPage = () => {
    return pageController.getCurrentPage();
  };

  /**
   * Get breadcrumbs for current page
   */
  const getBreadcrumbs = () => {
    return pageController.getBreadcrumbs();
  };

  // ========== Service Management ==========

  /**
   * Get all services
   */
  const getAllServices = () => {
    return serviceController.getServices();
  };

  /**
   * Get service by ID
   * @param serviceId - Service identifier
   */
  const getService = (serviceId: string) => {
    return serviceController.getServiceById(serviceId);
  };

  /**
   * Get featured services for homepage
   */
  const getFeaturedServices = () => {
    return serviceController.getFeaturedServices();
  };

  // ========== Contact Management ==========

  /**
   * Submit contact form
   * @param formData - Contact form data
   */
  const submitContactForm = async (formData: ContactFormData) => {
    try {
      isLoading.value = true;
      const result = await contactController.submitContactForm(formData);
      return result;
    } catch (err) {
      error.value = 'Failed to submit contact form';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Validate contact form
   * @param formData - Contact form data
   */
  const validateContactForm = (formData: ContactFormData) => {
    return contactController.validateForm(formData);
  };

  /**
   * Get contact information
   */
  const getContactInfo = () => {
    return contactController.getContactInfo();
  };

  // ========== Content Management ==========

  /**
   * Get hero content
   */
  const getHeroContent = () => {
    return contentController.getHeroContent();
  };

  /**
   * Get about content
   */
  const getAboutContent = () => {
    return contentController.getAboutContent();
  };

  // ========== Utility Functions ==========

  /**
   * Get service ID from route
   * @param route - Route path
   * @returns Service ID
   */
  const getServiceIdFromRoute = (route: string): string => {
    const routeToServiceId: Record<string, string> = {
      '/evidential-analysis': 'evidential-analysis',
      '/operational-process-reengineering': 'operational-process-reengineering', 
      '/editing-translation': 'editing-translation'
    };
    return routeToServiceId[route] || '';
  };

  /**
   * Clear error state
   */
  const clearError = (): void => {
    error.value = null;
  };

  /**
   * Get application status
   */
  const getApplicationStatus = () => {
    return {
      isReady: !isLoading.value && !error.value,
      isLoading: isLoading.value,
      hasError: !!error.value,
      error: error.value,
      currentPage: getCurrentPage()?.title || 'Unknown'
    };
  };

  // ========== Computed Properties ==========

  const currentPageTitle = computed(() => {
    const page = getCurrentPage();
    return page?.title || 'PietBergh ProAnalysis';
  });

  const currentPageDescription = computed(() => {
    const page = getCurrentPage();
    return page?.description || 'Professional business analysis and consulting services';
  });

  const isHomePage = computed(() => {
    return route.path === '/';
  });

  const isServicePage = computed(() => {
    return [
      '/evidential-analysis',
      '/operational-process-reengineering',
      '/editing-translation'
    ].includes(route.path);
  });

  // ========== Reactive State ==========

  const applicationState = computed(() => ({
    isLoading: isLoading.value,
    error: error.value,
    currentPageData: currentPageData.value,
    currentPage: getCurrentPage(),
    navigation: getNavigation(),
    breadcrumbs: getBreadcrumbs()
  }));

  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    currentPageData: readonly(currentPageData),
    applicationState,

    // Page management
    initializePage,
    getCurrentPage,
    getBreadcrumbs,
    navigateToPage,

    // Service management
    getAllServices,
    getService,
    getFeaturedServices,

    // Contact management
    submitContactForm,
    validateContactForm,
    getContactInfo,

    // Content management
    getHeroContent,
    getAboutContent,

    // Navigation
    getNavigation,

    // Computed properties
    currentPageTitle,
    currentPageDescription,
    isHomePage,
    isServicePage,

    // Utilities
    clearError,
    getApplicationStatus
  };
}