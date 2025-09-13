<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <ServiceHero 
      :subtitle="heroSubtitle"
      :stats="heroStats"
      @contact="handleContactNavigation"
    />
    
    <!-- Services Overview -->
    <ServicesOverview 
      :services="services"
      :description="servicesDescription"
      :show-view-all="false"
      @view-details="selectService"
      @contact="handleContactNavigation"
    />
    
    <!-- Detailed Services Section -->
    <section class="section-padding bg-slate-50">
      <div class="container-section">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="badge-secondary mb-4">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              <path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clip-rule="evenodd"/>
            </svg>
            Detailed Service Information
          </div>
          
          <h2 class="heading-section">
            Service Specifications
          </h2>
          
          <p class="text-subtitle">
            Comprehensive details about our specialized services, methodologies, and proven track record of success.
          </p>
        </div>

        <!-- Service Details -->
        <div class="space-y-12">
          <ServiceDetail
            v-for="service in services"
            :key="service.id"
            :service="service"
            @contact="handleServiceContact"
          />
        </div>
      </div>
    </section>
    
    <!-- Contact CTA Section -->
    <section class="section-padding bg-primary-600">
      <div class="container-section text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Contact us today to discuss your specific needs and discover how our expertise can help you achieve your objectives.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleContactNavigation"
            class="btn-white"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contact Us Today
          </button>
          <button
            @click="handleTestimonialsNavigation"
            class="btn-outline-white"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            View Testimonials
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ServiceHero from '../components/ServiceHero.vue';
import ServicesOverview from '../components/ServicesOverview.vue';
import ServiceDetail from '../components/ServiceDetail.vue';
import { useServices } from '../composables/useServices';

const router = useRouter();

const {
  services,
  heroStats,
  heroSubtitle,
  servicesDescription,
  loadServices,
  selectService,
  handleServiceContact
} = useServices();

/**
 * Handle navigation to contact page
 */
const handleContactNavigation = (): void => {
  router.push({ name: 'Contact' });
};

/**
 * Handle navigation to testimonials page
 */
const handleTestimonialsNavigation = (): void => {
  router.push({ name: 'Testimonials' });
};

/**
 * Initialize component
 */
onMounted(async () => {
  await loadServices();
});
</script>