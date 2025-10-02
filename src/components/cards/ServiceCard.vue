<template>
  <div class="card-service group flex flex-col min-h-[440px]">
    <!-- Service Icon -->
    <div class="mb-6 flex-shrink-0">
      <div class="icon-container-lg">
        <slot name="icon">
          <!-- Default icon if none provided -->
          <svg class="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </slot>
      </div>
    </div>

    <!-- Title and Description - Fixed height -->
    <div class="h-16">
      <p class="md:text-xl font-semibold w-full">
        {{ title }}
      </p>
    </div>
    <div class="h-28">
      <p class="text-slate-600 leading-relaxed line-clamp-3">
        {{ description }}
      </p>
    </div>

    <!-- Service Features - Fixed height for consistency -->
    <div class="mb-4 h-20 flex-shrink-0">
      <ul class="space-y-2">
        <li 
          v-for="(feature, index) in features?.slice(0, maxFeatures)" 
          :key="index"
          class="flex items-center text-sm text-slate-600"
        >
          <svg class="w-4 h-4 text-secondary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {{ feature }}
        </li>
      </ul>
    </div>

    <!-- Service Meta - always at bottom -->
    <div class="mt-auto pt-3 border-t border-slate-100 flex-shrink-0">
      <slot name="actions">
        <!-- Default actions if none provided -->
        <div class="flex items-center justify-between">
          <a href="#" class="text-slate-300 hover:text-blue-300 transition-colors text-sm flex items-center group">
            <span class="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
            Learn More
          </a>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  features?: string[];
  maxFeatures?: number;
}

withDefaults(defineProps<Props>(), {
  features: () => [],
  maxFeatures: 3
});
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
