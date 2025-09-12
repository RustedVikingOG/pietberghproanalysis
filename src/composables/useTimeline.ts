import { ref, onMounted, onUnmounted, nextTick, readonly, type Ref } from 'vue';

/**
 * Composable for managing timeline animation and interaction logic
 */
export function useTimeline() {
  // Reactive state
  const activePhase: Ref<number> = ref(0);
  const isVisible: Ref<boolean[]> = ref([]);
  const timelineElement: Ref<HTMLElement | null> = ref(null);
  
  // Intersection Observer for scroll-based animations
  let observer: IntersectionObserver | null = null;

  /**
   * Scroll to a specific timeline phase
   * @param index - Index of the phase to scroll to
   */
  const scrollToPhase = (index: number): void => {
    if (!timelineElement.value) return;
    
    const phaseElements = timelineElement.value.querySelectorAll('[data-phase]');
    const targetElement = phaseElements[index] as HTMLElement;
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      activePhase.value = index;
    }
  };

  /**
   * Set up scroll triggers for timeline animations
   */
  const setupScrollTriggers = (): void => {
    if (!timelineElement.value) return;

    // Clean up existing observer
    if (observer) {
      observer.disconnect();
    }

    const phaseElements = timelineElement.value.querySelectorAll('[data-phase]');
    
    // Initialize visibility array
    isVisible.value = new Array(phaseElements.length).fill(false);

    // Create intersection observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-phase') || '0');
          
          if (entry.isIntersecting) {
            // Make phase visible
            isVisible.value[index] = true;
            
            // Update active phase if this is the first visible phase
            if (index < activePhase.value || activePhase.value === 0) {
              activePhase.value = index;
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '-50px 0px -50px 0px' // Add some margin
      }
    );

    // Observe all phase elements
    phaseElements.forEach((element) => {
      observer?.observe(element);
    });
  };

  /**
   * Set the timeline element reference
   * @param element - The timeline container element
   */
  const setTimelineRef = (element: HTMLElement | null): void => {
    timelineElement.value = element;
    
    if (element) {
      // Setup scroll triggers after next tick to ensure DOM is ready
      nextTick(() => {
        setupScrollTriggers();
      });
    }
  };

  /**
   * Navigate to next phase
   */
  const nextPhase = (): void => {
    if (activePhase.value < isVisible.value.length - 1) {
      scrollToPhase(activePhase.value + 1);
    }
  };

  /**
   * Navigate to previous phase
   */
  const previousPhase = (): void => {
    if (activePhase.value > 0) {
      scrollToPhase(activePhase.value - 1);
    }
  };

  /**
   * Check if a specific phase is active
   * @param index - Phase index to check
   * @returns True if phase is active
   */
  const isPhaseActive = (index: number): boolean => {
    return activePhase.value === index;
  };

  /**
   * Check if a specific phase is visible
   * @param index - Phase index to check
   * @returns True if phase is visible
   */
  const isPhaseVisible = (index: number): boolean => {
    return isVisible.value[index] || false;
  };

  /**
   * Get timeline progress as percentage
   * @returns Progress percentage (0-100)
   */
  const getProgress = (): number => {
    if (isVisible.value.length === 0) return 0;
    return ((activePhase.value + 1) / isVisible.value.length) * 100;
  };

  /**
   * Reset timeline to initial state
   */
  const resetTimeline = (): void => {
    activePhase.value = 0;
    isVisible.value = [];
  };

  /**
   * Cleanup function
   */
  const cleanup = (): void => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  // Lifecycle hooks
  onMounted(() => {
    // Set up timeline if element is already available
    if (timelineElement.value) {
      setupScrollTriggers();
    }
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    // State
    activePhase: readonly(activePhase),
    isVisible: readonly(isVisible),
    
    // Methods
    scrollToPhase,
    setupScrollTriggers,
    setTimelineRef,
    nextPhase,
    previousPhase,
    isPhaseActive,
    isPhaseVisible,
    getProgress,
    resetTimeline,
    cleanup
  };
}