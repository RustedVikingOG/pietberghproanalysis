<template>
  <section class="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 lg:py-24">
    <div class="container-section">
      <div class="text-center">
        <!-- Badge -->
        <div class="badge-primary mb-6">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Professional Services
        </div>
        
        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
          Specialized Investigation &amp; Analysis
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-slate-600 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
        
        <!-- CTA -->
        <div class="mt-12">
          <button
            @click="$emit('contact')"
            class="btn-primary btn-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Get Expert Consultation
          </button>
        </div>
      </div>
    </div>
    
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
        <defs>
          <pattern id="service-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1"/>
            <circle cx="12" cy="8" r="1"/>
            <circle cx="8" cy="14" r="1"/>
            <circle cx="18" cy="6" r="1"/>
            <circle cx="6" cy="18" r="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#service-pattern)"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  subtitle: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

defineProps<Props>();

defineEmits<{
  contact: [];
}>();
</script>