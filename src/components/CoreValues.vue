<template>
  <section id="values" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Core Values & Principles
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          The fundamental principles that guide every aspect of our professional service and commitment to excellence
        </p>
      </div>

      <!-- Values grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(value, index) in coreValues"
          :key="index"
          class="group text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100"
          :class="[
            'transform hover:-translate-y-1',
            `animation-delay-${index * 100}`
          ]"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
              <component 
                :is="getValueIcon(value.icon)"
                class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
              />
            </div>
          </div>

          <!-- Value name -->
          <h3 class="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
            {{ value.name }}
          </h3>

          <!-- Value description -->
          <p class="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
            {{ value.description }}
          </p>

          <!-- Hover indicator -->
          <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="w-12 h-1 bg-blue-600 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

      <!-- Additional context -->
      <div class="mt-16 text-center">
        <div class="bg-blue-50 p-8 rounded-xl border border-blue-100">
          <div class="max-w-4xl mx-auto">
            <h3 class="text-xl font-semibold text-blue-900 mb-4">
              37 Years of Unwavering Commitment
            </h3>
            <p class="text-blue-800 leading-relaxed">
              These values have been the cornerstone of an illustrious career in law enforcement and continue to guide 
              our approach to private consulting. Every case, every analysis, and every client interaction reflects 
              these deeply held principles that have earned trust and respect throughout the professional community.
            </p>
          </div>
        </div>
      </div>

      <!-- Interactive elements -->
      <div class="mt-12 flex justify-center">
        <div class="flex space-x-2">
          <button
            v-for="(_, index) in coreValues"
            :key="index"
            @click="highlightValue(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-200',
              highlightedIndex === index ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
            ]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { CoreValue } from '@/models/AboutContent';

interface Props {
  coreValues: CoreValue[];
}

defineProps<Props>();

// State for interactive highlighting
const highlightedIndex = ref<number | null>(null);

/**
 * Highlight a specific value
 */
const highlightValue = (index: number): void => {
  highlightedIndex.value = highlightedIndex.value === index ? null : index;
};

/**
 * Get icon component for value
 */
const getValueIcon = (iconName?: string): string => {
  // Icon mapping - in a real app you'd use icon library
  const iconMap: Record<string, string> = {
    'shield-check': 'div', // Integrity
    'magnifying-glass': 'div', // Precision
    'academic-cap': 'div', // Expertise
    'heart': 'div' // Service
  };
  
  return iconMap[iconName || ''] || 'div';
};
</script>

<style scoped>
/* Animation delays */
.animation-delay-0 {
  animation-delay: 0ms;
}
.animation-delay-100 {
  animation-delay: 100ms;
}
.animation-delay-200 {
  animation-delay: 200ms;
}
.animation-delay-300 {
  animation-delay: 300ms;
}

/* Fade-in animation on scroll */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>