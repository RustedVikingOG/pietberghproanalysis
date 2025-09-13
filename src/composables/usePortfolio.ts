import { ref, computed, type Ref } from 'vue';
import { PortfolioController } from '../controllers/PortfolioController';
import type { SuccessStory } from '../models/SuccessStory';

// Configuration constants
const PORTFOLIO_LOADING_DELAY = 100; // ms - simulates async loading

/**
 * Composable for portfolio functionality
 * Provides reactive state and methods for portfolio management
 */
export function usePortfolio() {
  // Controller instance
  const controller = new PortfolioController();

  // Reactive state
  const portfolioItems: Ref<SuccessStory[]> = ref([]);
  const selectedCategory: Ref<string> = ref('all');
  const selectedCaseType: Ref<SuccessStory['caseType'] | 'all'> = ref('all');
  const searchQuery: Ref<string> = ref('');
  const isLoading: Ref<boolean> = ref(false);

  // Computed properties
  const filteredPortfolioItems = computed(() => {
    let items = portfolioItems.value;

    // Apply category filter
    if (selectedCategory.value !== 'all') {
      items = items.filter(item => 
        item.category.toLowerCase().includes(selectedCategory.value.toLowerCase())
      );
    }

    // Apply case type filter
    if (selectedCaseType.value !== 'all') {
      items = items.filter(item => item.caseType === selectedCaseType.value);
    }

    // Apply search filter
    if (searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.outcome.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.location?.toLowerCase().includes(searchTerm)
      );
    }

    return items;
  });

  const availableCategories = computed(() => {
    return ['all', ...controller.getAvailableCategories()];
  });

  const availableCaseTypes = computed((): (SuccessStory['caseType'] | 'all')[] => {
    return ['all', ...controller.getAvailableCaseTypes()];
  });

  const portfolioStats = computed(() => {
    return controller.getPortfolioStats();
  });

  const heroData = computed(() => {
    return controller.getPortfolioHero();
  });

  // Methods
  const loadPortfolioItems = async (): Promise<void> => {
    isLoading.value = true;
    try {
      // Simulate async loading (in real app, this would be an API call)
      await new Promise(resolve => setTimeout(resolve, PORTFOLIO_LOADING_DELAY));
      portfolioItems.value = controller.getPortfolioItems();
    } catch (error) {
      console.error('Failed to load portfolio items:', error);
      portfolioItems.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const setCategory = (category: string): void => {
    selectedCategory.value = category;
  };

  const setCaseType = (caseType: SuccessStory['caseType'] | 'all'): void => {
    selectedCaseType.value = caseType;
  };

  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  const clearFilters = (): void => {
    selectedCategory.value = 'all';
    selectedCaseType.value = 'all';
    searchQuery.value = '';
  };

  const formatCaseType = (caseType: SuccessStory['caseType']): string => {
    return caseType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    // State
    portfolioItems,
    selectedCategory,
    selectedCaseType,
    searchQuery,
    isLoading,
    
    // Computed
    filteredPortfolioItems,
    availableCategories,
    availableCaseTypes,
    portfolioStats,
    heroData,
    
    // Methods
    loadPortfolioItems,
    setCategory,
    setCaseType,
    setSearchQuery,
    clearFilters,
    formatCaseType,
    formatDate
  };
}