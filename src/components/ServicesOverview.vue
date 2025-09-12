<template>
  <section class="section-padding bg-slate-50">
    <div class="container-section">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="badge-primary mb-4">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Professional Services
        </div>
        
        <h2 class="heading-section">
          Specialized Investigation &amp; Analysis
        </h2>
        
        <p class="text-subtitle">
          {{ description }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid-services">
        <div
          v-for="service in displayServices"
          :key="service.id"
          class="card-service group"
        >
          <!-- Service Icon -->
          <div class="mb-6">
            <div class="icon-container-lg">
              <svg class="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Evidence Analysis Icon -->
                <path v-if="service.category === 'evidence-analysis'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                <!-- Process Reengineering Icon -->
                <path v-else-if="service.category === 'process-reengineering'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                <!-- Editing & Translation Icon -->
                <path v-else-if="service.category === 'editing-translation'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                <!-- Default Investigation Icon -->
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Service Content -->
          <div class="mb-6">
            <h3 class="text-card-title">
              {{ service.title }}
            </h3>
            <p class="text-slate-600 leading-relaxed line-clamp-3">
              {{ service.description }}
            </p>
          </div>

          <!-- Service Features -->
          <div class="mb-6">
            <ul class="space-y-2">
              <li 
                v-for="feature in service.features?.slice(0, 3)" 
                :key="feature"
                class="flex items-center text-sm text-slate-600"
              >
                <svg class="w-4 h-4 text-secondary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Service Meta -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="flex items-center space-x-4">
              <span class="text-sm text-slate-500">
                Consultation Available
              </span>
              <span class="text-sm font-semibold text-secondary-600">
                Contact for Pricing
              </span>
            </div>
            
            <button
              @click="handleViewDetails(service.id)"
              class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group"
            >
              Learn More
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <div class="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div class="max-w-3xl mx-auto">
            <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Ready to Get Started?
            </h3>
            <p class="text-lg text-slate-600 mb-8">
              Let's discuss how our professional investigation and analysis services can help you achieve your objectives with precision and confidentiality.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="$emit('contact')"
                class="btn-primary-lg"
              >
                Schedule Consultation
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </button>
              
              <button
                @click="$emit('view-all')"
                class="btn-outline border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Service } from '@/models/Service';

// Props
interface Props {
  services?: Service[];
  description?: string;
  maxServices?: number;
}

const props = withDefaults(defineProps<Props>(), {
  services: () => [],
  description: 'Leveraging 37+ years of law enforcement experience and specialized expertise in investigation, evidence analysis, and process reengineering to deliver comprehensive professional services.',
  maxServices: 6
});

// Emits
defineEmits<{
  'view-details': [serviceId: string];
  'contact': [];
  'view-all': [];
}>();

// Computed
const displayServices = computed(() => 
  props.services.slice(0, props.maxServices)
);

// Methods
const handleViewDetails = (serviceId: string) => {
  console.log('View service details:', serviceId);
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>