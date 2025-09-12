import { ref, computed, readonly, type Ref } from 'vue';
import type { AboutContent } from '../models/AboutContent';
import { AboutController } from '../controllers/AboutController';

/**
 * Composable for managing About page reactive state and data fetching
 */
export function useAboutContent() {
  // Reactive state
  const aboutData: Ref<AboutContent | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);
  
  // Controller instance
  const aboutController = new AboutController();

  /**
   * Fetch about page data
   */
  const fetchAboutData = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      
      aboutData.value = await aboutController.getAboutPageData();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load about content';
      console.error('Error fetching about data:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * Refresh content data
   */
  const refreshContent = async (): Promise<void> => {
    await fetchAboutData();
  };

  /**
   * Get professional statistics
   */
  const professionalStats = computed(() => {
    return aboutController.getProfessionalStats();
  });

  /**
   * Check if data is loaded and available
   */
  const isDataLoaded = computed(() => {
    return aboutData.value !== null && !loading.value;
  });

  /**
   * Get formatted journey phases
   */
  const journeyPhases = computed(() => {
    return aboutData.value?.journey || [];
  });

  /**
   * Get core values
   */
  const coreValues = computed(() => {
    return aboutData.value?.values || [];
  });

  /**
   * Get achievements list
   */
  const achievements = computed(() => {
    return aboutData.value?.achievements || [];
  });

  /**
   * Get introduction text
   */
  const introduction = computed(() => {
    return aboutData.value?.introduction || '';
  });

  /**
   * Get professional association info
   */
  const professionalAssociation = computed(() => {
    return aboutData.value?.professionalAssociation || '';
  });

  return {
    // State
    aboutData: readonly(aboutData),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    isDataLoaded,
    professionalStats,
    journeyPhases,
    coreValues,
    achievements,
    introduction,
    professionalAssociation,
    
    // Methods
    fetchAboutData,
    refreshContent
  };
}