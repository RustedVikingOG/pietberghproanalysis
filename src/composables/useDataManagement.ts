import { ref, computed, watch, readonly } from 'vue';
import type { ContactFormData } from '../models/ContactForm';

/**
 * Advanced data management composable for Phase 2 business logic
 * Handles caching, persistence, and advanced state management
 */
export function useDataManagement() {
  // ========== Cache Management ==========
  
  const cache = ref<Map<string, { data: any; timestamp: number; expiry: number }>>(new Map());
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  /**
   * Set cache entry with expiration
   * @param key - Cache key
   * @param data - Data to cache
   * @param customExpiry - Custom expiry duration in milliseconds
   */
  const setCache = (key: string, data: any, customExpiry?: number): void => {
    const expiry = customExpiry || CACHE_DURATION;
    cache.value.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  };

  /**
   * Get cache entry if not expired
   * @param key - Cache key
   * @returns Cached data or null
   */
  const getCache = (key: string): any | null => {
    const entry = cache.value.get(key);
    
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > entry.expiry) {
      cache.value.delete(key);
      return null;
    }
    
    return entry.data;
  };

  /**
   * Clear expired cache entries
   */
  const clearExpiredCache = (): void => {
    const now = Date.now();
    for (const [key, entry] of cache.value.entries()) {
      if (now - entry.timestamp > entry.expiry) {
        cache.value.delete(key);
      }
    }
  };

  /**
   * Clear all cache
   */
  const clearAllCache = (): void => {
    cache.value.clear();
  };

  // ========== Local Storage Management ==========

  /**
   * Save data to localStorage
   * @param key - Storage key
   * @param data - Data to save
   */
  const saveToStorage = (key: string, data: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  /**
   * Load data from localStorage
   * @param key - Storage key
   * @param maxAge - Maximum age in milliseconds
   * @returns Stored data or null
   */
  const loadFromStorage = (key: string, maxAge?: number): any | null => {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;

      const { data, timestamp } = JSON.parse(stored);
      
      if (maxAge && Date.now() - timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return null;
    }
  };

  /**
   * Remove data from localStorage
   * @param key - Storage key
   */
  const removeFromStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  };

  // ========== Form Data Persistence ==========

  const formDrafts = ref<Map<string, ContactFormData>>(new Map());

  /**
   * Save form draft
   * @param formId - Form identifier
   * @param formData - Form data to save
   */
  const saveFormDraft = (formId: string, formData: ContactFormData): void => {
    formDrafts.value.set(formId, { ...formData });
    saveToStorage(`formDraft_${formId}`, formData);
  };

  /**
   * Load form draft
   * @param formId - Form identifier
   * @returns Saved form data or null
   */
  const loadFormDraft = (formId: string): ContactFormData | null => {
    // Check memory first
    const memoryDraft = formDrafts.value.get(formId);
    if (memoryDraft) return memoryDraft;

    // Check localStorage
    const storedDraft = loadFromStorage(`formDraft_${formId}`, 24 * 60 * 60 * 1000); // 24 hours
    if (storedDraft) {
      formDrafts.value.set(formId, storedDraft);
      return storedDraft;
    }

    return null;
  };

  /**
   * Clear form draft
   * @param formId - Form identifier
   */
  const clearFormDraft = (formId: string): void => {
    formDrafts.value.delete(formId);
    removeFromStorage(`formDraft_${formId}`);
  };

  // ========== User Preferences ==========

  const preferences = ref({
    theme: 'light',
    language: 'en',
    reducedMotion: false,
    fontSize: 'medium',
    highContrast: false
  });

  /**
   * Load user preferences from storage
   */
  const loadPreferences = (): void => {
    const stored = loadFromStorage('userPreferences');
    if (stored) {
      preferences.value = { ...preferences.value, ...stored };
    }
  };

  /**
   * Save user preferences to storage
   */
  const savePreferences = (): void => {
    saveToStorage('userPreferences', preferences.value);
  };

  /**
   * Update preference
   * @param key - Preference key
   * @param value - Preference value
   */
  const updatePreference = <K extends keyof typeof preferences.value>(
    key: K,
    value: typeof preferences.value[K]
  ): void => {
    preferences.value[key] = value;
    savePreferences();
  };

  // ========== Analytics and Usage Tracking ==========

  const analytics = ref({
    pageViews: new Map<string, number>(),
    serviceInteractions: new Map<string, number>(),
    formSubmissions: 0,
    sessionStartTime: Date.now(),
    lastActivity: Date.now()
  });

  /**
   * Track page view
   * @param pagePath - Page path
   */
  const trackPageView = (pagePath: string): void => {
    const current = analytics.value.pageViews.get(pagePath) || 0;
    analytics.value.pageViews.set(pagePath, current + 1);
    analytics.value.lastActivity = Date.now();
  };

  /**
   * Track service interaction
   * @param serviceId - Service identifier
   */
  const trackServiceInteraction = (serviceId: string): void => {
    const current = analytics.value.serviceInteractions.get(serviceId) || 0;
    analytics.value.serviceInteractions.set(serviceId, current + 1);
    analytics.value.lastActivity = Date.now();
  };

  /**
   * Track form submission
   */
  const trackFormSubmission = (): void => {
    analytics.value.formSubmissions++;
    analytics.value.lastActivity = Date.now();
  };

  /**
   * Get session duration
   * @returns Session duration in minutes
   */
  const getSessionDuration = (): number => {
    return Math.round((Date.now() - analytics.value.sessionStartTime) / (1000 * 60));
  };

  /**
   * Get analytics summary
   */
  const getAnalyticsSummary = () => {
    return {
      sessionDuration: getSessionDuration(),
      pageViews: Object.fromEntries(analytics.value.pageViews),
      serviceInteractions: Object.fromEntries(analytics.value.serviceInteractions),
      formSubmissions: analytics.value.formSubmissions,
      lastActivity: analytics.value.lastActivity
    };
  };

  // ========== Service Favorites ==========

  const favoriteServices = ref<Set<string>>(new Set());

  /**
   * Load favorite services
   */
  const loadFavoriteServices = (): void => {
    const stored = loadFromStorage('favoriteServices');
    if (stored && Array.isArray(stored)) {
      favoriteServices.value = new Set(stored);
    }
  };

  /**
   * Save favorite services
   */
  const saveFavoriteServices = (): void => {
    saveToStorage('favoriteServices', Array.from(favoriteServices.value));
  };

  /**
   * Add service to favorites
   * @param serviceId - Service identifier
   */
  const addToFavorites = (serviceId: string): void => {
    favoriteServices.value.add(serviceId);
    saveFavoriteServices();
  };

  /**
   * Remove service from favorites
   * @param serviceId - Service identifier
   */
  const removeFromFavorites = (serviceId: string): void => {
    favoriteServices.value.delete(serviceId);
    saveFavoriteServices();
  };

  /**
   * Check if service is favorited
   * @param serviceId - Service identifier
   * @returns Boolean indicating if service is favorited
   */
  const isFavorite = (serviceId: string): boolean => {
    return favoriteServices.value.has(serviceId);
  };

  // ========== Recent Activity ==========

  const recentActivity = ref<Array<{
    type: 'page_view' | 'service_view' | 'form_submit' | 'download';
    item: string;
    timestamp: number;
  }>>([]);

  /**
   * Add recent activity
   * @param type - Activity type
   * @param item - Activity item
   */
  const addRecentActivity = (
    type: 'page_view' | 'service_view' | 'form_submit' | 'download',
    item: string
  ): void => {
    recentActivity.value.unshift({
      type,
      item,
      timestamp: Date.now()
    });

    // Keep only last 50 activities
    if (recentActivity.value.length > 50) {
      recentActivity.value = recentActivity.value.slice(0, 50);
    }

    saveToStorage('recentActivity', recentActivity.value);
  };

  /**
   * Load recent activity
   */
  const loadRecentActivity = (): void => {
    const stored = loadFromStorage('recentActivity', 7 * 24 * 60 * 60 * 1000); // 7 days
    if (stored && Array.isArray(stored)) {
      recentActivity.value = stored;
    }
  };

  /**
   * Get recent activity filtered by type
   * @param type - Activity type to filter
   * @param limit - Maximum number of items
   * @returns Filtered recent activity
   */
  const getRecentActivityByType = (
    type: 'page_view' | 'service_view' | 'form_submit' | 'download',
    limit = 10
  ) => {
    return recentActivity.value
      .filter(activity => activity.type === type)
      .slice(0, limit);
  };

  // ========== Computed Properties ==========

  const cacheSize = computed(() => cache.value.size);
  
  const totalFormDrafts = computed(() => formDrafts.value.size);
  
  const favoriteServicesCount = computed(() => favoriteServices.value.size);
  
  const totalPageViews = computed(() => {
    return Array.from(analytics.value.pageViews.values()).reduce((sum, count) => sum + count, 0);
  });

  // ========== Watchers ==========

  // Auto-save preferences when they change
  watch(preferences, savePreferences, { deep: true });

  // Periodic cache cleanup
  setInterval(clearExpiredCache, 60000); // Every minute

  // ========== Initialization ==========

  /**
   * Initialize data management
   */
  const initializeDataManagement = (): void => {
    loadPreferences();
    loadFavoriteServices();
    loadRecentActivity();
  };

  return {
    // Cache management
    setCache,
    getCache,
    clearExpiredCache,
    clearAllCache,
    cacheSize,

    // Storage management
    saveToStorage,
    loadFromStorage,
    removeFromStorage,

    // Form drafts
    saveFormDraft,
    loadFormDraft,
    clearFormDraft,
    totalFormDrafts,

    // User preferences
    preferences: readonly(preferences),
    updatePreference,
    loadPreferences,
    savePreferences,

    // Analytics
    trackPageView,
    trackServiceInteraction,
    trackFormSubmission,
    getSessionDuration,
    getAnalyticsSummary,
    totalPageViews,

    // Favorites
    favoriteServices: readonly(favoriteServices),
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    favoriteServicesCount,

    // Recent activity
    recentActivity: readonly(recentActivity),
    addRecentActivity,
    getRecentActivityByType,

    // Initialization
    initializeDataManagement
  };
}