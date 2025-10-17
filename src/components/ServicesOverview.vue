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
        <ServiceCard
          v-for="service in displayServices"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :features="service.features"
          :max-features="3"
        >
          <template #icon>
            <!-- Evidence Analysis Icon -->
            <FileText v-if="service.category === 'evidence-analysis'" class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            <!-- Process Reengineering Icon -->
            <Workflow v-else-if="service.category === 'process-reengineering'" class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            <!-- Editing & Translation Icon -->
            <Languages v-else-if="service.category === 'editing-translation'" class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            <!-- Default Investigation Icon -->
            <Search v-else class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </template>

          <template #actions>
            <div class="flex items-center justify-between">
              <router-link
                :to="`/contact`"
                class="
                  text-white hover:text-gray-300 transition-colors 
                  text-sm flex items-center group bg-blue-500
                  p-[6px] pr-[12px] rounded-md
                "
              >
                <span class="w-1 h-1 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-200"></span>
                Contact for Pricing
              </router-link>
              
              <router-link
                :to="
                  service.category === 'evidence-analysis' ? '/services#evidence-analysis' :
                  service.category === 'process-reengineering' ? '/services#process-reengineering' :
                  service.category === 'editing-translation' ? '/services#editing-translation' :
                  '/services'
                "
                class="text-blue-700 hover:text-blue-300 transition-colors text-sm flex items-center group"
              >
                <span class="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                Learn More >
              </router-link>
            </div>
          </template>
        </ServiceCard>
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
                class="btn border-2 border-slate-300 text-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-700 px-8 py-4 text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
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
import { FileText, Workflow, Languages, Search } from 'lucide-vue-next';
import ServiceCard from '@/components/cards/ServiceCard.vue';

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

// Computed
const displayServices = computed(() => 
  props.services.slice(0, props.maxServices)
);
</script>

