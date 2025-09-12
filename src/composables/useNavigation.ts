import { ref, computed, readonly, type Ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PageController } from '../controllers/PageController';
import type { Page } from '../models/Page';

/**
 * Composable for navigation state and routing logic
 */
export function useNavigation() {
  const router = useRouter();
  const route = useRoute();
  const pageController = new PageController();
  
  // Reactive state
  const currentPage: Ref<Page | null> = ref(null);
  const isMenuOpen = ref(false);
  const isLoading = ref(false);

  // Computed properties
  const navigationItems = computed(() => pageController.getNavigationItems());
  const breadcrumbs = computed(() => pageController.getBreadcrumbs());
  const isHomePage = computed(() => route.path === '/');

  /**
   * Navigate to a specific route
   * @param path - Route path to navigate to
   */
  const navigateTo = async (path: string): Promise<void> => {
    try {
      isLoading.value = true;
      await router.push(path);
      updateCurrentPage(path);
      closeMenu();
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Navigate back to previous page
   */
  const goBack = (): void => {
    router.back();
  };

  /**
   * Navigate forward
   */
  const goForward = (): void => {
    router.forward();
  };

  /**
   * Check if a route is currently active
   * @param path - Route path to check
   * @returns Boolean indicating if route is active
   */
  const isActiveRoute = (path: string): boolean => {
    return route.path === path;
  };

  /**
   * Update current page based on route
   * @param path - Current route path
   */
  const updateCurrentPage = (path: string): void => {
    const success = pageController.setCurrentPage(path);
    if (success) {
      currentPage.value = pageController.getCurrentPage();
    }
  };

  /**
   * Toggle mobile menu open/close
   */
  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  /**
   * Close mobile menu
   */
  const closeMenu = (): void => {
    isMenuOpen.value = false;
  };

  /**
   * Open mobile menu
   */
  const openMenu = (): void => {
    isMenuOpen.value = true;
  };

  /**
   * Get page title for current route
   * @returns Page title or default
   */
  const getPageTitle = (): string => {
    return currentPage.value?.title || 'PietBergh ProAnalysis';
  };

  /**
   * Get page description for current route
   * @returns Page description or default
   */
  const getPageDescription = (): string => {
    return currentPage.value?.description || 'Professional Investigation & Analysis Services';
  };

  /**
   * Check if current route has navigation guards
   * @returns Boolean indicating if route needs authentication or validation
   */
  const requiresAuth = (): boolean => {
    // Currently no authentication required, but structure for future
    return false;
  };

  /**
   * Handle route change effects
   * @param newPath - New route path
   */
  const handleRouteChange = (newPath: string): void => {
    updateCurrentPage(newPath);
    closeMenu();
    
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update document focus for accessibility
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
    }
  };

  /**
   * Get navigation history for breadcrumbs
   * @returns Array of visited routes
   */
  const getNavigationHistory = (): string[] => {
    // Simple history tracking (could be enhanced with proper state management)
    const history = sessionStorage.getItem('navigationHistory');
    return history ? JSON.parse(history) : ['/'];
  };

  /**
   * Add route to navigation history
   * @param path - Route path to add
   */
  const addToHistory = (path: string): void => {
    const history = getNavigationHistory();
    if (history[history.length - 1] !== path) {
      history.push(path);
      // Keep only last 10 routes
      if (history.length > 10) {
        history.shift();
      }
      sessionStorage.setItem('navigationHistory', JSON.stringify(history));
    }
  };

  /**
   * Initialize navigation on component mount
   */
  const initializeNavigation = (): void => {
    updateCurrentPage(route.path);
    addToHistory(route.path);
  };

  /**
   * Handle keyboard navigation
   * @param event - Keyboard event
   */
  const handleKeyboardNavigation = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        closeMenu();
        break;
      case 'Enter':
        if (event.target instanceof HTMLElement && event.target.hasAttribute('data-nav-item')) {
          const path = event.target.getAttribute('data-nav-path');
          if (path) navigateTo(path);
        }
        break;
    }
  };

  // Initialize on first use
  initializeNavigation();

  return {
    // Reactive state
    currentPage: readonly(currentPage),
    isMenuOpen: readonly(isMenuOpen),
    isLoading: readonly(isLoading),
    
    // Computed properties
    navigationItems,
    breadcrumbs,
    isHomePage,
    
    // Navigation methods
    navigateTo,
    goBack,
    goForward,
    isActiveRoute,
    
    // Menu methods
    toggleMenu,
    closeMenu,
    openMenu,
    
    // Page info methods
    getPageTitle,
    getPageDescription,
    
    // Route management
    handleRouteChange,
    requiresAuth,
    
    // History methods
    getNavigationHistory,
    addToHistory,
    
    // Event handlers
    handleKeyboardNavigation,
    
    // Utility methods
    initializeNavigation
  };
}