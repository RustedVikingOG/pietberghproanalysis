<template>
  <!-- <section class="relative bg-gradient-primary text-white overflow-hidden"> -->
  <section class="relative bg-gradient-to-br from-slate-600 to-slate-800 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="bg-hero-pattern">
      <div class="absolute inset-0 bg-white/5 pattern-dots"></div>
    </div>

    <!-- Content Container -->
    <div class="relative container-section section-padding">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Content Column -->
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
              <span 
                class="
                  block text-slate-900
                "
              >{{ heroData.mainTitle }}</span>
              <span class="block text-secondary-400 text-hero-subtitle">
                {{ heroData.subtitle }}
              </span>
            </h1>
          </div>

          <!-- Description -->
          <p class="text-xl text-primary-100 leading-relaxed max-w-2xl">
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

          <!-- Quick Stats -->
          <CardLayout
            :class="'grid-stats pt-8 border-t border-primary-600/30'"
          >
            <StatCard
              v-for="stat in stats"
              :key="stat.id"
              :value="stat.value"
              :label="stat.label"
              :container-class="`text-center`"
              :value-class="`text-stat-value text-secondary-400`"
              :label-class="`text-stat-label text-primary-200`"
            />
          </CardLayout>
        </div> 

        <!-- Image/Visual Column -->
        <div class="relative">
          <!-- Professional Portrait Container -->
          <div class="relative">
            <!-- Background Shape -->
            <div class="absolute inset-0 bg-gradient-to-br from-secondary-500/20 to-secondary-600/30 rounded-3xl transform rotate-3"></div>
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-primary-500/30 rounded-3xl transform -rotate-2"></div>
            
            <!-- Professional Logo Container -->
            <div class="relative bg-slate-100 rounded-2xl p-8 shadow-2xl">
              <div class="aspect-w-4 aspect-h-5 bg-gradient-to-b from-slate-200 to-slate-300 rounded-xl flex items-center justify-center">
                <div class="text-center">
                  <img 
                    :src="logoDark" 
                    alt="PietBergh ProAnalysis Logo" 
                    class="w-24 h-24 mx-auto mb-4"
                  />
                  <p class="text-sm font-medium text-slate-700">PietBergh ProAnalysis</p>
                  <p class="text-xs text-slate-500">Professional Investigation Services</p>
                </div>
              </div>
              
              <!-- Credentials Badge -->
              <div class="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div class="flex items-center space-x-2 text-primary-700">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-sm font-semibold">Brigadier</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div class="absolute -top-6 -left-6 bg-secondary-500 rounded-full p-4 shadow-lg animate-pulse">
            <svg class="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          
          <div class="absolute -bottom-8 -left-8 bg-primary-500 rounded-lg p-3 shadow-lg">
            <div class="text-white text-sm font-medium">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Available for Consultation</span>
              </div>
            </div>
          </div>
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
import logoDark from '@/assets/logo-dark.svg';
import CardLayout from './layouts/CardLayout.vue';
import StatCard from './cards/StatCard.vue';
import { useAchievementStats } from '@/composables/achievements/useAchievementStats';
import { animate } from 'animejs';

// Helper function to generate random numbers
const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

animate('.shape', {
  x: random(-100, 100),
  y: random(-100, 100),
  rotate: random(-180, 180),
  duration: random(500, 1000),
  composition: 'blend',
});

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