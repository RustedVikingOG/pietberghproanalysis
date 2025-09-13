<template>
  <div class="portfolio-filters bg-white border-b border-slate-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
            </svg>
          </div>
          <input
            type="text"
            :value="searchQuery"
            @input="$emit('search', ($event.target as HTMLInputElement).value)"
            class="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search case studies by title, description, or location..."
          />
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        <!-- Category Filter -->
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col space-y-2">
            <label class="text-sm font-medium text-slate-700">Category:</label>
            <select
              :value="selectedCategory"
              @change="$emit('category-change', ($event.target as HTMLSelectElement).value)"
              class="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              <option v-for="category in availableCategories.filter(c => c !== 'all')" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Case Type Filter -->
          <div class="flex flex-col space-y-2">
            <label class="text-sm font-medium text-slate-700">Case Type:</label>
            <select
              :value="selectedCaseType"
              @change="$emit('case-type-change', ($event.target as HTMLSelectElement).value as SuccessStory['caseType'] | 'all')"
              class="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Case Types</option>
              <option v-for="caseType in availableCaseTypes.filter(t => t !== 'all')" :key="caseType" :value="caseType">
                {{ formatCaseType(caseType) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Results Info and Clear Filters -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="text-sm text-slate-600">
            <span class="font-medium">{{ totalResults }}</span>
            {{ totalResults === 1 ? 'case study' : 'case studies' }}
            <span v-if="hasActiveFilters">found</span>
          </div>

          <button
            v-if="hasActiveFilters"
            @click="$emit('clear-filters')"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Active Filter Tags -->
      <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
        <span v-if="selectedCategory !== 'all'" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          Category: {{ selectedCategory }}
          <button
            @click="$emit('category-change', 'all')"
            class="ml-2 inline-flex items-center p-0.5 rounded-full text-primary-600 hover:bg-primary-200 hover:text-primary-800"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </span>
        
        <span v-if="selectedCaseType !== 'all'" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
          Type: {{ formatCaseType(selectedCaseType) }}
          <button
            @click="$emit('case-type-change', 'all')"
            class="ml-2 inline-flex items-center p-0.5 rounded-full text-secondary-600 hover:bg-secondary-200 hover:text-secondary-800"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </span>
        
        <span v-if="searchQuery.trim()" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          Search: "{{ searchQuery }}"
          <button
            @click="$emit('search', '')"
            class="ml-2 inline-flex items-center p-0.5 rounded-full text-slate-600 hover:bg-slate-200 hover:text-slate-800"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SuccessStory } from '@/models/SuccessStory';

interface Props {
  searchQuery: string;
  selectedCategory: string;
  selectedCaseType: SuccessStory['caseType'] | 'all';
  availableCategories: string[];
  availableCaseTypes: (SuccessStory['caseType'] | 'all')[];
  totalResults: number;
}

interface Emits {
  (e: 'search', query: string): void;
  (e: 'category-change', category: string): void;
  (e: 'case-type-change', caseType: SuccessStory['caseType'] | 'all'): void;
  (e: 'clear-filters'): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const hasActiveFilters = computed(() => {
  return props.selectedCategory !== 'all' || 
         props.selectedCaseType !== 'all' || 
         props.searchQuery.trim() !== '';
});

const formatCaseType = (caseType: SuccessStory['caseType'] | 'all'): string => {
  if (caseType === 'all') return 'All';
  return caseType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>

<style scoped>
.portfolio-filters {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>