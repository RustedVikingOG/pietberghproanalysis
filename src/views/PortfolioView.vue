<template>
  <div class="min-h-screen bg-white">
    <div class="main-content">

      <div class="h-10"></div>

      <!-- Case Detail View -->
      <div v-if="selectedCase" class="container-section py-16">
        <button 
          @click="router.push('/portfolio')" 
          class="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Portfolio
        </button>
        
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ selectedCase.title }}</h1>
          <div class="flex flex-wrap gap-4 mb-8">
            <span class="badge-primary">{{ selectedCase.category }}</span>
            <span class="badge-secondary">{{ selectedCase.caseType }}</span>
            <span class="text-slate-600">{{ selectedCase.date }}</span>
            <span v-if="selectedCase.location" class="text-slate-600">{{ selectedCase.location }}</span>
          </div>
          
          <div class="prose max-w-none mb-8">
            <h2>Case Description</h2>
            <p class="text-lg text-slate-700">{{ selectedCase.description }}</p>
            
            <h2>Outcome</h2>
            <p class="text-lg text-slate-700">{{ selectedCase.outcome }}</p>
            
            <h2>Evidence Analysis</h2>
            <p class="text-slate-600">{{ selectedCase.evidence.length }} pieces of evidence analyzed</p>
          </div>
          
          <div class="flex gap-4">
            <button @click="handleContact" class="btn-primary">Discuss Your Case</button>
            <button @click="router.push('/portfolio')" class="btn-outline">View More Cases</button>
          </div>
        </div>
      </div>

      <!-- Portfolio List View -->
      <div v-else>

      <!-- Portfolio Hero Section -->
      <PortfolioHero 
        :portfolio-stats="portfolioStats"
        :featured-cases="featuredCases"
        @view-case="handleViewDetails"
        @view-all-cases="scrollToPortfolio"
      />

      <!-- Portfolio Filters -->
      <PortfolioFilters
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :selected-case-type="selectedCaseType"
        :available-categories="availableCategories"
        :available-case-types="availableCaseTypes"
        :total-results="filteredPortfolioItems.length"
        @search="setSearchQuery"
        @category-change="setCategory"
        @case-type-change="setCaseType"
        @clear-filters="clearFilters"
      />

      <!-- Portfolio Stats -->
      <section class="section-padding bg-slate-50">
        <div class="container-section">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ portfolioStats.totalCases }}+</div>
              <div class="text-sm font-medium text-slate-600">Successful Cases</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ portfolioStats.successRate }}</div>
              <div class="text-sm font-medium text-slate-600">Success Rate</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ portfolioStats.yearsActive }}+</div>
              <div class="text-sm font-medium text-slate-600">Years Experience</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600 mb-2">{{ Object.keys(portfolioStats.caseTypes).length }}</div>
              <div class="text-sm font-medium text-slate-600">Case Categories</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Portfolio Grid -->
      <section id="portfolio-cases" class="section-padding">
        <div class="container-section">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center items-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredPortfolioItems.length === 0" class="text-center py-16">
            <svg class="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3 class="text-lg font-medium text-slate-900 mb-2">No case studies found</h3>
            <p class="text-slate-600 mb-4">Try adjusting your search criteria or clearing the filters.</p>
            <button @click="clearFilters" class="btn-primary">Clear All Filters</button>
          </div>

          <!-- Portfolio Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortfolioCard
              v-for="item in filteredPortfolioItems"
              :key="item.id"
              :success-story="item"
              @view-details="handleViewDetails"
            />
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="section-padding bg-primary-50">
        <div class="container-section text-center">
          <h2 class="heading-section mb-4">Ready to Add Your Success Story?</h2>
          <p class="text-slate-600 mb-8 max-w-2xl mx-auto">
            Get in touch to discuss how our proven investigative and analytical expertise 
            can help solve your most challenging cases.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="handleContact" class="btn-primary-lg">
              Start Your Case
            </button>
            <button @click="handleServicesView" class="btn-outline">
              View Our Services
            </button>
          </div>
        </div>
      </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PortfolioHero from '@/components/PortfolioHero.vue';
import PortfolioFilters from '@/components/PortfolioFilters.vue';
import PortfolioCard from '@/components/PortfolioCard.vue';
import { usePortfolio } from '@/composables/usePortfolio';
import { PortfolioController } from '@/controllers/PortfolioController';
import type { SuccessStory } from '@/models/SuccessStory';

// Router for navigation
const router = useRouter();
const route = useRoute();

// Portfolio controller instance
const portfolioController = new PortfolioController();

// Use portfolio composable
const {
  // State
  isLoading,
  searchQuery,
  selectedCategory,
  selectedCaseType,
  
  // Computed
  filteredPortfolioItems,
  availableCategories,
  availableCaseTypes,
  portfolioStats,
  
  // Methods
  loadPortfolioItems,
  setSearchQuery,
  setCategory,
  setCaseType,
  clearFilters
} = usePortfolio();

// Featured cases for the hero component
const featuredCases = computed(() => {
  return portfolioController.getFeaturedCases(3); // Get top 3 featured cases
});

// Check if we're viewing a specific case detail
const caseId = computed(() => route.params.id as string | undefined);
const selectedCase = computed(() => {
  if (!caseId.value) return null;
  return portfolioController.getPortfolioItems().find(item => item.id === caseId.value) || null;
});

// Load portfolio items on mount
onMounted(async () => {
  await loadPortfolioItems();
});

// Scroll to portfolio section
const scrollToPortfolio = () => {
  const portfolioSection = document.getElementById('portfolio-cases');
  if (portfolioSection) {
    // Respect user's motion preferences for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    portfolioSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }
};

// Event handlers
const handleViewDetails = (story: SuccessStory) => {
  // Navigate to case study detail page following MVC routing pattern
  router.push(`/portfolio/${story.id}`);
};

const handleContact = () => {
  // Navigate to contact page using router
  router.push('/contact');
};

const handleServicesView = () => {
  // Navigate to services page using router  
  router.push('/services');
};
</script>