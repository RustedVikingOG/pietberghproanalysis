import { ref, computed, readonly, type Ref, type ComputedRef } from 'vue';
import type { Credential } from '../models/Credential';
import { AboutController } from '../controllers/AboutController';
import { AboutUtils } from '../utils/aboutUtils';

/**
 * Composable for managing credential display logic and formatting
 */
export function useCredentialDisplay() {
  // Reactive state
  const displayMode: Ref<'list' | 'grid'> = ref('grid');
  const sortBy: Ref<'year' | 'type' | 'institution'> = ref('year');
  const filterBy: Ref<'all' | 'academic' | 'professional' | 'training' | 'certifications'> = ref('all');
  const showOnlyRecent: Ref<boolean> = ref(false);
  
  // Controller instance
  const aboutController = new AboutController();

  /**
   * Get all credentials
   */
  const allCredentials = computed(() => {
    return aboutController.getFormattedCredentials();
  });

  /**
   * Get grouped credentials based on current filter
   */
  const groupedCredentials: ComputedRef<{
    academic: Credential[];
    professional: Credential[];
    training: Credential[];
    certifications: Credential[];
  }> = computed(() => {
    const credentials = allCredentials.value;
    
    if (showOnlyRecent.value) {
      // Filter to only recent credentials
      const filteredCredentials = {
        academic: credentials.academic.filter(AboutUtils.isRecentCredential),
        professional: credentials.professional.filter(AboutUtils.isRecentCredential),
        training: credentials.training.filter(AboutUtils.isRecentCredential),
        certifications: credentials.certifications.filter(AboutUtils.isRecentCredential)
      };
      
      return filteredCredentials;
    }
    
    return credentials;
  });

  /**
   * Get flat list of credentials for list view
   */
  const flatCredentials = computed(() => {
    const grouped = groupedCredentials.value;
    let allCreds: Credential[] = [];
    
    if (filterBy.value === 'all') {
      allCreds = [
        ...grouped.academic,
        ...grouped.professional,
        ...grouped.training,
        ...grouped.certifications
      ];
    } else {
      allCreds = grouped[filterBy.value] || [];
    }
    
    return sortCredentials(allCreds);
  });

  /**
   * Get credentials grouped by institution
   */
  const credentialsByInstitution = computed(() => {
    return AboutUtils.groupCredentialsByInstitution(flatCredentials.value);
  });

  /**
   * Get credential statistics
   */
  const credentialStats = computed(() => {
    const grouped = groupedCredentials.value;
    return {
      total: flatCredentials.value.length,
      academic: grouped.academic.length,
      professional: grouped.professional.length,
      training: grouped.training.length,
      certifications: grouped.certifications.length,
      recent: flatCredentials.value.filter(AboutUtils.isRecentCredential).length
    };
  });

  /**
   * Sort credentials based on current sort criteria
   * @param credentials - Credentials to sort
   * @returns Sorted credentials
   */
  const sortCredentials = (credentials: Credential[]): Credential[] => {
    const sorted = [...credentials];
    
    switch (sortBy.value) {
      case 'year':
        return sorted.sort((a, b) => b.year - a.year);
      case 'type':
        return sorted.sort((a, b) => a.type.localeCompare(b.type));
      case 'institution':
        return sorted.sort((a, b) => a.institution.localeCompare(b.institution));
      default:
        return sorted;
    }
  };

  /**
   * Toggle display mode between list and grid
   */
  const toggleDisplayMode = (): void => {
    displayMode.value = displayMode.value === 'list' ? 'grid' : 'list';
  };

  /**
   * Sort credentials by specified criteria
   * @param by - Sort criteria
   */
  const sortCredentialsBy = (by: 'year' | 'type' | 'institution'): void => {
    sortBy.value = by;
  };

  /**
   * Filter credentials by type
   * @param filter - Filter criteria
   */
  const filterCredentials = (filter: 'all' | 'academic' | 'professional' | 'training' | 'certifications'): void => {
    filterBy.value = filter;
  };

  /**
   * Toggle recent credentials filter
   */
  const toggleRecentFilter = (): void => {
    showOnlyRecent.value = !showOnlyRecent.value;
  };

  /**
   * Get display label for credential type
   * @param type - Credential type
   * @returns Human-readable label
   */
  const getTypeLabel = (type: Credential['type']): string => {
    return AboutUtils.getCredentialTypeLabel(type);
  };

  /**
   * Check if credential is recent
   * @param credential - Credential to check
   * @returns True if recent
   */
  const isRecent = (credential: Credential): boolean => {
    return AboutUtils.isRecentCredential(credential);
  };

  /**
   * Reset all filters and sorting to defaults
   */
  const resetFilters = (): void => {
    displayMode.value = 'grid';
    sortBy.value = 'year';
    filterBy.value = 'all';
    showOnlyRecent.value = false;
  };

  /**
   * Get available filter options
   */
  const filterOptions = computed(() => [
    { value: 'all', label: 'All Credentials', count: credentialStats.value.total },
    { value: 'academic', label: 'Academic', count: credentialStats.value.academic },
    { value: 'professional', label: 'Professional', count: credentialStats.value.professional },
    { value: 'training', label: 'Training', count: credentialStats.value.training },
    { value: 'certifications', label: 'Certifications', count: credentialStats.value.certifications }
  ]);

  return {
    // State
    displayMode: readonly(displayMode),
    sortBy: readonly(sortBy),
    filterBy: readonly(filterBy),
    showOnlyRecent: readonly(showOnlyRecent),
    
    // Computed
    groupedCredentials,
    flatCredentials,
    credentialsByInstitution,
    credentialStats,
    filterOptions,
    
    // Methods
    toggleDisplayMode,
    sortCredentialsBy,
    filterCredentials,
    toggleRecentFilter,
    getTypeLabel,
    isRecent,
    resetFilters
  };
}