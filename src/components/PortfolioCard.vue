<template>
  <article class="card-portfolio bg-white rounded-xl shadow-md border border-slate-200 p-6 cursor-pointer group">
    <!-- Card Header -->
    <div class="mb-6">
      <div class="flex justify-between items-start mb-4">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide" :class="getCaseTypeClass(successStory.caseType)">
          {{ formatCaseType(successStory.caseType) }}
        </span>
        <time class="text-sm text-slate-500" :datetime="successStory.date">
          {{ formatDate(successStory.date) }}
        </time>
      </div>
      
      <h3 class="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
        {{ successStory.title }}
      </h3>
      
      <p class="text-sm font-medium text-slate-600">
        {{ successStory.category }}
      </p>
    </div>

    <!-- Card Content -->
    <div class="mb-6 space-y-4">
      <p class="text-slate-700 leading-relaxed">
        {{ successStory.description }}
      </p>

      <!-- Location Badge -->
      <div v-if="successStory.location" class="inline-flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
        {{ successStory.location }}
      </div>

      <!-- Evidence List -->
      <div class="space-y-2">
        <h4 class="text-sm font-semibold text-slate-900">Key Evidence:</h4>
        <ul class="space-y-1">
          <li v-for="evidence in successStory.evidence.slice(0, 3)" :key="evidence" class="flex items-start text-sm text-slate-600">
            <svg class="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ evidence }}
          </li>
          <li v-if="successStory.evidence.length > 3" class="text-slate-500 italic text-sm">
            +{{ successStory.evidence.length - 3 }} more evidence items
          </li>
        </ul>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="space-y-4">
      <div class="space-y-2">
        <h4 class="text-sm font-semibold text-slate-900">Outcome:</h4>
        <p class="text-sm text-slate-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">{{ successStory.outcome }}</p>
      </div>

      <!-- Action Button -->
      <div class="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button 
          v-if="successStory.mediaLink" 
          @click="openMediaLink"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 hover:border-primary-300 transition-colors duration-200"
          :aria-label="`Read more about ${successStory.title}`"
        >
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
          </svg>
          Read Media Coverage
        </button>
        
        <button 
          @click="$emit('view-details', successStory)"
          class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 transition-colors duration-200"
          :aria-label="`View details for ${successStory.title}`"
        >
          View Details
          <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SuccessStory } from '@/models/SuccessStory';

interface Props {
  successStory: SuccessStory;
}

interface Emits {
  (e: 'view-details', story: SuccessStory): void;
  (e: 'media-link-error', error: string): void;
}

// Define props and emits
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatCaseType = (caseType: SuccessStory['caseType']): string => {
  return caseType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

const getCaseTypeClass = (caseType: SuccessStory['caseType']): string => {
  const classes: Record<SuccessStory['caseType'], string> = {
    'murder': 'bg-red-100 text-red-800',
    'fraud': 'bg-orange-100 text-orange-800',
    'cash-in-transit': 'bg-blue-100 text-blue-800',
    'corruption': 'bg-purple-100 text-purple-800',
    'other': 'bg-slate-100 text-slate-800'
  };
  return classes[caseType] || classes.other;
};

const openMediaLink = (): void => {
  // Open media link in new window/tab with error handling
  if (props.successStory.mediaLink) {
    try {
      const newWindow = window.open(props.successStory.mediaLink, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        emit('media-link-error', 'Popup was blocked by your browser. Please allow popups for this site.');
      }
    } catch (error) {
      emit('media-link-error', 'Failed to open the link. The URL may be invalid.');
    }
  }
};
</script>

<style scoped>
.card-portfolio {
  transition: all 0.3s ease;
}

.card-portfolio:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>