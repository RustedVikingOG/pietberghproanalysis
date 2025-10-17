<template>
  <div :id="id" class="card-service-detail bg-white rounded-xl shadow-sm border border-slate-200 p-8">
    <!-- Service Header -->
    <div class="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <div class="icon-container-xl">
          <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <!-- Title and Description -->
      <div class="flex-1">
        <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
          {{ service.title }}
        </h3>
        <p class="text-lg text-slate-600 leading-relaxed mb-6">
          {{ service.description }}
        </p>
        <p v-if="service.detailDescription" class="text-slate-700 leading-relaxed">
          {{ service.detailDescription }}
        </p>
      </div>
    </div>

    <!-- Service Details Grid -->
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Features -->
      <div>
        <h4 class="text-xl font-semibold text-slate-900 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Key Features
        </h4>
        <ul class="space-y-3">
          <li v-for="feature in service.features" :key="feature" class="flex items-start">
            <svg class="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span class="text-slate-700">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Benefits -->
      <div>
        <h4 class="text-xl font-semibold text-slate-900 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          Key Benefits
        </h4>
        <ul class="space-y-3">
          <li v-for="benefit in service.benefits" :key="benefit" class="flex items-start">
            <svg class="w-4 h-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-slate-700">{{ benefit }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Methodology (if available) -->
    <div v-if="service.methodology && service.methodology.length > 0" class="mt-8 pt-8 border-t border-slate-200">
      <h4 class="text-xl font-semibold text-slate-900 mb-4 flex items-center">
        <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V7a2 2 0 012-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17l4-4 4 4"/>
        </svg>
        Methodology
      </h4>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(step, index) in service.methodology"
          :key="step"
          class="flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg"
        >
          <div class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mb-3">
            {{ index + 1 }}
          </div>
          <span class="text-sm text-slate-700 font-medium">{{ step }}</span>
        </div>
      </div>
    </div>

    <!-- Tools (if available) -->
    <div v-if="service.tools && service.tools.length > 0" class="mt-8 pt-8 border-t border-slate-200">
      <h4 class="text-xl font-semibold text-slate-900 mb-4 flex items-center">
        <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Professional Tools
      </h4>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tool in service.tools"
          :key="tool"
          class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
        >
          {{ tool }}
        </span>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="mt-8 pt-8 border-t border-slate-200">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h5 class="text-lg font-semibold text-slate-900 mb-1">
            Interested in this service?
          </h5>
          <p class="text-slate-600">
            Contact us to discuss your specific requirements and how we can help.
          </p>
        </div>
        <button
          @click="$emit('contact', service.id)"
          class="btn-primary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          Get in Touch
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '@/models/Service';

interface Props {
  service: Service;
  id?: string;
}

defineProps<Props>();

defineEmits<{
  contact: [serviceId: string];
}>();
</script>