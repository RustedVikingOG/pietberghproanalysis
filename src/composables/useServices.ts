import { ref, computed } from 'vue';
import type { Service } from '../models/Service';
import { ServiceController } from '../controllers/ServiceController';

/**
 * Composable for managing services page state and logic
 */
export function useServices() {
  const serviceController = new ServiceController();
  const services = ref<Service[]>([]);
  const selectedServiceId = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Load all services data
   */
  const loadServices = async (): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;
      services.value = serviceController.getServices();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load services';
      console.error('Error loading services:', err);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Get hero section statistics
   */
  const heroStats = computed(() => [
    {
      value: '30+',
      label: 'Years Experience'
    },
    {
      value: '26',
      label: 'High-Profile Cases'
    },
    {
      value: '3',
      label: 'Specialized Services'
    }
  ]);

  /**
   * Get hero subtitle text
   */
  const heroSubtitle = computed(() => 
    'Three decades of expertise in forensic investigation, process optimization, and linguistic services. Delivering precision, integrity, and results.'
  );

  /**
   * Get services overview description
   */
  const servicesDescription = computed(() =>
    'Comprehensive professional services combining forensic expertise, operational excellence, and linguistic precision to deliver exceptional results.'
  );

  /**
   * Get currently selected service
   */
  const selectedService = computed((): Service | null => {
    if (!selectedServiceId.value) return null;
    return serviceController.getServiceById(selectedServiceId.value);
  });

  /**
   * Select a service for detailed view
   */
  const selectService = (serviceId: string): void => {
    selectedServiceId.value = serviceId;
  };

  /**
   * Clear service selection
   */
  const clearSelection = (): void => {
    selectedServiceId.value = null;
  };

  /**
   * Get service by category
   */
  const getServiceByCategory = (category: Service['category']): Service | null => {
    return serviceController.getServiceByCategory(category);
  };

  /**
   * Handle contact request for a specific service
   */
  const handleServiceContact = (serviceId: string): void => {
    // This will be handled by parent component or router navigation
    console.log('Contact request for service:', serviceId);
  };

  /**
   * Handle navigation to contact page
   */
  const handleContactNavigation = (): void => {
    // This will be handled by parent component or router navigation
    console.log('Navigate to contact page');
  };

  return {
    // State
    services,
    selectedServiceId,
    selectedService,
    isLoading,
    error,

    // Computed
    heroStats,
    heroSubtitle,
    servicesDescription,

    // Methods
    loadServices,
    selectService,
    clearSelection,
    getServiceByCategory,
    handleServiceContact,
    handleContactNavigation
  };
}