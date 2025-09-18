<template>
  <section id="hero" class="relative bg-slate-900 text-white py-16 lg:py-24">
    <!-- Background gradient overlay -->
    <div class="bg-hero-pattern">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-90"></div>
    </div>
    
    <!-- Content container -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Professional introduction content -->
        <div class="space-y-6">
          <!-- Title and credentials -->
          <div class="space-y-3">
            <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-amber-400">
              Piet Bergh
            </h1>
            <h2 class="text-xl lg:text-2xl text-blue-200 font-medium">
              {{ stats.rank }} | Professional Analyst
            </h2>
            <p class="text-lg text-slate-300 leading-relaxed">
              {{ introduction }}
            </p>
          </div>

          <!-- Call to action -->
          <div class="pt-4">
            <button 
              @click="scrollToServices"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Services
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Professional statistics -->
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div class="text-3xl lg:text-4xl font-bold text-blue-300">
              {{ stats.yearsOfService }}+
            </div>
            <div class="text-sm text-slate-300 mt-2">
              Years of Distinguished Service
            </div>
          </div>
          
          <div class="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div class="text-3xl lg:text-4xl font-bold text-amber-300">
              {{ stats.casesAnalyzed }}
            </div>
            <div class="text-sm text-slate-300 mt-2">
              High-Profile Cases Analyzed
            </div>
          </div>
          
          <div class="col-span-2 text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div class="text-lg font-semibold text-slate-200 mb-2">
              Specialization
            </div>
            <div class="text-blue-300 font-medium">
              {{ stats.specialization }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl transform -translate-x-48 translate-y-48"></div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  introduction: string;
  stats: {
    yearsOfService: number;
    rank: string;
    casesAnalyzed: number;
    specialization: string;
  };
}

defineProps<Props>();

/**
 * Scroll to services section (emit event for parent to handle)
 */
const emit = defineEmits<{
  scrollToServices: [];
}>();

const scrollToServices = () => {
  emit('scrollToServices');
};
</script>