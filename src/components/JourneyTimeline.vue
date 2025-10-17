<template>
  <section id="journey" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Professional Journey
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          A career defined by unwavering dedication to justice, continuous growth, and exceptional service
        </p>
      </div>

      <!-- Timeline container -->
      <div 
        ref="timelineContainer"
        class="relative"
      >
        <!-- Progress indicator -->
        <div class="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-slate-300">
          <div 
            class="absolute top-0 left-0 w-full bg-blue-600 transition-all duration-1000 ease-out"
            :style="{ height: `${progress}%` }"
          ></div>
        </div>

        <!-- Timeline phases -->
        <div class="space-y-12 lg:space-y-16">
          <div
            v-for="(phase, index) in journeyPhases"
            :key="index"
            :data-phase="index"
            class="relative flex items-center"
            :class="[
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
              'transition-all duration-700 ease-out transform',
              isPhaseVisible(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            ]"
          >
            <!-- Timeline marker -->
            <div class="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
              <div 
                class="w-8 h-8 rounded-full border-4 border-white shadow-lg transition-all duration-300"
                :class="[
                  isPhaseActive(index) ? 'bg-blue-600 scale-110' : 'bg-slate-400',
                  isPhaseVisible(index) ? 'animate-pulse' : ''
                ]"
              >
                <!-- Icon -->
                <div class="flex items-center justify-center w-full h-full">
                  <component 
                    :is="getPhaseIcon(phase.icon)"
                    class="w-4 h-4 text-white"
                  />
                </div>
              </div>
            </div>

            <!-- Content card -->
            <div 
              class="ml-16 lg:ml-0 lg:w-5/12 bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300"
              :class="{ 'lg:mr-auto lg:ml-8': index % 2 === 0, 'lg:ml-auto lg:mr-8': index % 2 === 1 }"
            >
              <!-- Years badge -->
              <div class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                {{ formatYear(phase.years) }}
              </div>

              <!-- Phase title -->
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                {{ phase.phase }}
              </h3>

              <!-- Phase description -->
              <p class="text-slate-600 leading-relaxed">
                {{ phase.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { JourneyPhase } from '@/models/AboutContent';
import { useTimeline } from '@/composables/useTimeline';
import { AboutUtils } from '@/utils/aboutUtils';

interface Props {
  journeyPhases: JourneyPhase[];
}

defineProps<Props>();

// Timeline functionality
const {
  setTimelineRef,
  isPhaseActive,
  isPhaseVisible,
  getProgress
} = useTimeline();

// Template ref
const timelineContainer = ref<HTMLElement | null>(null);

// Computed properties
const progress = computed(() => getProgress());

/**
 * Format year display
 */
const formatYear = (years?: string): string => {
  if (!years) return '';
  return AboutUtils.formatJourneyYear(years);
};

/**
 * Get icon component for phase
 */
const getPhaseIcon = (_iconName?: string): string => {
  // Return simple div for now - in a real app you'd use icon library
  return 'div';
};

// Set up timeline reference on mount
onMounted(() => {
  if (timelineContainer.value) {
    setTimelineRef(timelineContainer.value);
  }
});
</script>