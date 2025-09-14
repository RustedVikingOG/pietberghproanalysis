<template>
  <Teleport to="body">
    <Transition
      name="modal"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        ref="modalElement"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
        tabindex="-1"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Modal Container -->
        <div
          :class="modalSizeClasses"
          class="relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <div class="flex items-center space-x-3">
              <!-- Icon -->
              <div
                v-if="icon"
                class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="getIconComponent(icon)" />
                </svg>
              </div>
              
              <!-- Title -->
              <h2 class="text-xl font-bold text-gray-900">
                {{ title }}
              </h2>
            </div>
            
            <!-- Close Button -->
            <button
              @click="handleClose"
              class="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors group"
              aria-label="Close modal"
            >
              <svg
                class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-88px)]">
            <div class="p-6">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { OverlayModalProps, OverlayModalEmits } from '@/models/OverlayModal';

// Template refs
const modalElement = ref<HTMLElement | null>(null);

// Props with defaults
const props = withDefaults(defineProps<OverlayModalProps>(), {
  closeOnClickOutside: true,
  closeOnEscape: true,
  maxWidth: 'lg'
});

// Emits
const emit = defineEmits<OverlayModalEmits>();

// Computed
const modalSizeClasses = computed(() => {
  const sizeMap = {
    sm: 'w-full max-w-sm',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-xl',
    '2xl': 'w-full max-w-2xl',
    '3xl': 'w-full max-w-3xl',
    '4xl': 'w-full max-w-4xl'
  };
  return sizeMap[props.maxWidth];
});

// Methods
const handleClose = (): void => {
  emit('close');
};

const handleBackdropClick = (): void => {
  if (props.closeOnClickOutside) {
    handleClose();
  }
};

const handleEscapeKey = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && props.closeOnEscape && props.isOpen) {
    handleClose();
  }
};

const getIconComponent = (iconName: string): string => {
  // Return appropriate SVG path based on icon name
  const iconMap: Record<string, string> = {
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  };

  return iconMap[iconName] || iconMap.document;
};

// Lifecycle
onMounted(() => {
  // Add global escape key listener
  document.addEventListener('keydown', handleEscapeKey);
  
  // Disable body scroll when modal is open
  if (props.isOpen) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  // Remove global escape key listener
  document.removeEventListener('keydown', handleEscapeKey);
  
  // Re-enable body scroll when component is destroyed
  document.body.style.overflow = '';
});

// Watch for isOpen changes to handle body scroll
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
/* Additional modal animations can be added here if needed */
</style>