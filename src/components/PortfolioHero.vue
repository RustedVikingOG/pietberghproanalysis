<template>
  <section class="relative bg-slate-50 border-b border-slate-200 py-16 lg:py-20">
    <!-- Investigation Board Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0 bg-slate-200" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 39px, #94a3b8 39px, #94a3b8 40px), repeating-linear-gradient(0deg, transparent, transparent 39px, #94a3b8 39px, #94a3b8 40px);"></div>
    </div>

    <div class="relative container-section">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <!-- Left Column: Main Content -->
        <div class="space-y-8">
          <!-- Case Status Badge -->
          <div class="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Cases Closed Successfully
          </div>

          <!-- Title with Evidence Theme -->
          <div class="space-y-4">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              <span class="block">Evidence-Based</span>
              <span class="block text-primary-600">Case Portfolio</span>
            </h1>
            <p class="text-xl text-slate-600 leading-relaxed">
              Documented success stories from {{ portfolioStats.totalCases }}+ high-profile investigations. 
              Each case represents meticulous analysis and court-proven results.
            </p>
          </div>

          <!-- Investigation Stats -->
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-4 border border-slate-200">
              <div class="text-2xl font-bold text-slate-900">{{ portfolioStats.successRate }}</div>
              <div class="text-sm text-slate-600 font-medium">Success Rate</div>
            </div>
            <div class="bg-white rounded-lg p-4 border border-slate-200">
              <div class="text-2xl font-bold text-slate-900">{{ portfolioStats.yearsActive }}+</div>
              <div class="text-sm text-slate-600 font-medium">Years Experience</div>
            </div>
          </div>

          <!-- Case Type Breakdown -->
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(count, caseType) in portfolioStats.caseTypes" 
              :key="caseType"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              :class="getCaseTypeColor(caseType)"
            >
              {{ formatCaseType(caseType) }}
            </span>
          </div>
        </div>

        <!-- Right Column: Featured Cases -->
        <div class="relative">
          <!-- Evidence Board Container -->
          <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-slate-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clip-rule="evenodd"/>
                </svg>
                Featured Cases
              </h3>
              <span class="text-sm text-slate-500">{{ featuredCases.length }} highlighted</span>
            </div>

            <!-- Featured Case Cards -->
            <div class="space-y-4">
              <div 
                v-for="case_ in featuredCases" 
                :key="case_.id"
                class="relative bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-primary-300 transition-colors duration-200 cursor-pointer group"
                @click="$emit('view-case', case_)"
              >
                <!-- Evidence Tag -->
                <div class="absolute -top-2 -right-2 bg-amber-400 text-amber-900 px-2 py-1 rounded text-xs font-bold">
                  EVIDENCE
                </div>

                <div class="space-y-3">
                  <div class="flex items-start justify-between">
                    <h4 class="font-semibold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">
                      {{ case_.title }}
                    </h4>
                    <span class="text-xs text-slate-500">{{ formatDate(case_.date) }}</span>
                  </div>
                  
                  <p class="text-sm text-slate-600 line-clamp-2">{{ case_.description }}</p>
                  
                  <div class="flex items-center justify-between">
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                      :class="getCaseTypeColor(case_.caseType)"
                    >
                      {{ formatCaseType(case_.caseType) }}
                    </span>
                    
                    <div v-if="case_.location" class="flex items-center text-xs text-slate-500">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                      </svg>
                      {{ case_.location }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- View All Cases Button -->
            <div class="mt-6 pt-4 border-t border-slate-200">
              <button 
                @click="$emit('view-all-cases')"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
                View All Case Studies
              </button>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded transform rotate-45"></div>
          <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-primary-600 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SuccessStory } from '@/models/SuccessStory';

interface Props {
  portfolioStats: {
    totalCases: number;
    caseTypes: Record<SuccessStory['caseType'], number>;
    successRate: string;
    yearsActive: number;
  };
  featuredCases: SuccessStory[];
}

interface Emits {
  (e: 'view-case', case_: SuccessStory): void;
  (e: 'view-all-cases'): void;
}

defineProps<Props>();
defineEmits<Emits>();

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

const getCaseTypeColor = (caseType: SuccessStory['caseType']): string => {
  const colors: Record<SuccessStory['caseType'], string> = {
    'murder': 'bg-red-100 text-red-800',
    'fraud': 'bg-orange-100 text-orange-800',
    'cash-in-transit': 'bg-blue-100 text-blue-800',
    'corruption': 'bg-purple-100 text-purple-800',
    'other': 'bg-slate-100 text-slate-800'
  };
  return colors[caseType] || colors.other;
};
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>