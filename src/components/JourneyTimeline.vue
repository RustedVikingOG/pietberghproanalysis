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

              <!-- Action button for key phases -->
              <div v-if="isKeyPhase(phase.phase)" class="mt-4">
                <button
                  @click="learnMore(phase.phase)"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center transition-colors duration-200"
                >
                  Learn more
                  <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation controls -->
      <div class="flex justify-center items-center mt-12 space-x-4">
        <button
          @click="previousPhase"
          :disabled="activePhase === 0"
          class="p-2 rounded-full bg-white shadow-md border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <div class="flex space-x-2">
          <button
            v-for="(_, index) in journeyPhases"
            :key="index"
            @click="scrollToPhase(index)"
            class="w-3 h-3 rounded-full transition-all duration-200"
            :class="[
              isPhaseActive(index) ? 'bg-blue-600' : 'bg-slate-300',
              'hover:scale-110'
            ]"
          />
        </div>

        <button
          @click="nextPhase"
          :disabled="activePhase === journeyPhases.length - 1"
          class="p-2 rounded-full bg-white shadow-md border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { JourneyPhase } from '../models/AboutContent';
import { useTimeline } from '../composables/useTimeline';
import { AboutUtils } from '../utils/aboutUtils';

interface Props {
  journeyPhases: JourneyPhase[];
}

defineProps<Props>();

const emit = defineEmits<{
  learnMore: [phase: string];
}>();

// Timeline functionality
const {
  activePhase,
  setTimelineRef,
  scrollToPhase,
  nextPhase,
  previousPhase,
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
 * Check if phase is a key phase that should show learn more button
 */
const isKeyPhase = (phaseName: string): boolean => {
  const keyPhases = ['The Mastery', 'The Return'];
  return keyPhases.includes(phaseName);
};

/**
 * Get icon component for phase
 */
const getPhaseIcon = (_iconName?: string): string => {
  // Return simple div for now - in a real app you'd use icon library
  return 'div';
};

/**
 * Handle learn more action
 */
const learnMore = (phase: string): void => {
  emit('learnMore', phase);
};

// Set up timeline reference on mount
onMounted(() => {
  if (timelineContainer.value) {
    setTimelineRef(timelineContainer.value);
  }
});
</script>