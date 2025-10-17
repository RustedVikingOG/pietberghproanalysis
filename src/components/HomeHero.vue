<template>
  <!-- <section class="relative bg-gradient-primary text-white overflow-hidden"> -->
  <section class="relative bg-gradient-to-br from-slate-600 to-slate-800 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="bg-hero-pattern">
      <div class="absolute inset-0 bg-white/5 pattern-dots"></div>
    </div>

    <!-- Content Container -->
    <div class="relative container-section section-padding">
      <div class="grid grid-cols-1 md:grid-cols-[70%_30%] gap-12 items-center">
        <div class="space-y-8">
          <!-- Badge -->
          <div class="badge-secondary">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ heroData.badge || 'Former SAPS Brigadier' }}
          </div>

          <!-- Main Title -->
          <div class="space-content">
            <h1 class="heading-hero">
              <span class="block text-gray-200 mb-4">
                {{ heroData.mainTitle }}
              </span>
              <span class="block text-secondary-400 text-hero-subtitle">
                {{ heroData.subtitle }}
              </span>
            </h1>
          </div>

          <!-- Description -->
          <p class="text-xl text-primary-100 leading-relaxed">
            {{ heroData.description }}
          </p>

          <!-- Tagline -->
          <div class="flex items-center space-x-3">
            <div class="h-1 w-12 bg-secondary-500 rounded"></div>
            <p class="text-secondary-300 font-medium italic">
              "{{ heroData.tagline }}"
            </p>
          </div>

          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="$emit('navigate', '/services')"
              class="btn-secondary-lg"
            >
              {{ heroData.callToAction }}
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
            
            <button 
              @click="$emit('navigate', '/about')"
              class="btn-outline-lg"
            >
              Learn More
            </button>
          </div>
        </div> 
        <div>
          <!-- Quick Stats -->
          <CardLayout
            :class="'flex flex-col pt-8'"
          >
            <div 
              v-for="stat in stats"
              :key="stat.id"
              class="mb-10 border border-white/20 rounded-[20px] pt-6 pb-6 bg-white/10 backdrop-blur-sm"
            >
              <StatCard
                :value="stat.value"
                :label="stat.label"
                :container-class="`text-center`"
                :value-class="`text-stat-value text-secondary-400`"
                :label-class="`text-stat-label text-primary-200`"
              />
            </div>
          </CardLayout>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div class="animate-bounce">
        <svg class="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardLayout from './layouts/CardLayout.vue';
import StatCard from './cards/StatCard.vue';

import { useAchievementStats } from '@/composables/achievements/useAchievementStats';
const { getStatsB } = useAchievementStats();
const stats = getStatsB();

// Props
interface Props {
  heroData?: {
    badge?: string;
    mainTitle: string;
    subtitle: string;
    description: string;
    tagline: string;
    callToAction: string;
    backgroundImage?: string;
  };
}

withDefaults(defineProps<Props>(), {
  heroData: () => ({
    badge: 'Former SAPS Brigadier',
    mainTitle: 'PietBergh ProAnalysis',
    subtitle: 'Professional Investigation & Analysis Services',
    description: 'Distinguished former SAPS Brigadier with 37+ years of law enforcement expertise, now offering specialized private consulting in evidence analysis, process reengineering, and linguistic services.',
    tagline: 'Meticulous Service for Impeccable Results',
    callToAction: 'Discover Our Services'
  })
});

// Emits
defineEmits<{
  navigate: [path: string];
}>();
</script>

<style scoped>
.aspect-w-4 {
  position: relative;
  padding-bottom: calc(5 / 4 * 100%);
}

.aspect-h-5 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.pattern-dots {
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>