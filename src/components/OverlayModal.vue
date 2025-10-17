<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
        tabindex="-1"
      >
        <!-- Backdrop -->
        <div class="modal-backdrop"></div>
        
        <!-- Modal Container -->
        <div
          :class="modalSizeClasses"
          class="relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden transform"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <div class="flex items-center space-x-3">
              <!-- Icon -->
              <slot name="icon"></slot>
              
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
import { computed, onMounted, onUnmounted } from 'vue';

import type { OverlayModalProps, OverlayModalEmits } from '@/models/OverlayModal';

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
.modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  transition: opacity 200ms ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>