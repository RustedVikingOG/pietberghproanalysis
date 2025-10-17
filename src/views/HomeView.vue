<template>
  <div class="min-h-screen">

    <div class="h-10"></div>
    
    <!-- Hero Section -->
    <HeroSection 
      :hero-data="heroData"
      @navigate="handleNavigation"
    />
    
    <!-- Services Overview -->
    <ServicesOverview 
      :services="featuredServices"
      :description="servicesDescription"
      :max-services="3"
      @view-details="handleServiceDetails"
      @contact="handleContact"
      @view-all="handleViewAllServices"
    />
    
    <!-- Experience Highlights -->
    <section class="section-padding bg-white">
      <div class="container-section">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="badge-secondary mb-4">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Proven Excellence
          </div>
          
          <h2 class="heading-section">
            Distinguished Career Highlights
          </h2>
          
          <p class="text-subtitle">
            Three decades of exceptional service in law enforcement, culminating in specialized private consulting expertise.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid-stats mb-16">
          <div
            v-for="stat in careerStats"
            :key="stat.label"
            class="card-stat"
          >
            <div class="text-stat-value text-primary-600 mb-2">
              {{ stat.value }}
            </div>
            <div class="text-stat-label">
              {{ stat.label }}
            </div>
            <div class="text-xs text-slate-500 mt-1">
              {{ stat.description }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call to Action -->
    <section class="section-padding bg-gradient-primary">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="heading-section text-white">
          Ready to Discuss Your Requirements?
        </h2>
        
        <p class="text-xl text-primary-100 leading-relaxed mb-8">
          Let's schedule a confidential consultation to explore how our specialized expertise can address your specific needs with precision and professionalism.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleContact"
            class="btn-secondary-lg"
          >
            Schedule Consultation
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </button>
          
          <button
            @click="handleViewServices"
            class="btn-outline-lg"
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeroSection from '@/components/HomeHero.vue';
import ServicesOverview from '@/components/ServicesOverview.vue';

import { useBusinessLogic } from '@/composables/useBusinessLogic';
import type { Service } from '@/models/Service';

// Router
const router = useRouter();

// Business Logic
const { getAllServices } = useBusinessLogic();

// Reactive Data
const servicesData = ref<Service[]>([]);

// Hero Data
const heroData = ref({
  badge: 'Former SAPS Brigadier',
  mainTitle: 'PietBergh ProAnalysis',
  subtitle: 'Professional Investigation & Analysis Services',
  description: 'Distinguished former SAPS Brigadier with 37+ years of law enforcement expertise, now offering specialized private consulting in evidence analysis, process reengineering, and linguistic services.',
  tagline: 'Meticulous Service for Impeccable Results',
  callToAction: 'Discover Our Services'
});

// Services Description
const servicesDescription = 'Leveraging 37+ years of law enforcement experience and specialized expertise in investigation, evidence analysis, and process reengineering to deliver comprehensive professional services.';

// Featured Services (will be populated from business logic)
const featuredServices = ref([
  {
    id: 'evidence-analysis',
    title: 'Evidence Analysis & Review',
    category: 'evidence-analysis' as const,
    description: 'Comprehensive analysis of evidence, documentation review, and expert consultation for legal proceedings with meticulous attention to detail.',
    features: [
      'Forensic document examination',
      'Chain of custody verification',
      'Expert witness testimony'
    ],
    benefits: [
      'Expert legal analysis',
      'Detailed documentation',
      'Professional testimony support'
    ]
  },
  {
    id: 'process-reengineering',
    title: 'Process Reengineering',
    category: 'process-reengineering' as const,
    description: 'Strategic optimization of organizational processes and procedures based on decades of operational management experience.',
    features: [
      'Workflow optimization',
      'Risk assessment protocols',
      'Compliance framework development'
    ],
    benefits: [
      'Improved efficiency',
      'Risk mitigation',
      'Regulatory compliance'
    ]
  },
  {
    id: 'editing-translation',
    title: 'Professional Editing & Translation',
    category: 'editing-translation' as const,
    description: 'Precision editorial and translation services for legal documents, reports, and professional communications.',
    features: [
      'Legal document editing',
      'Multilingual editorial and translation services',
      'Technical report review'
    ],
    benefits: [
      'Clear communication',
      'Professional quality',
      'Multilingual expertise'
    ]
  }
]);

// Career Statistics
const careerStats = ref([
  {
    value: '37+',
    label: 'Years Experience',
    description: 'In law enforcement'
  },
  {
    value: '26+',
    label: 'High-Profile Cases',
    description: 'Successfully managed'
  },
  {
    value: '30',
    label: 'Management Years',
    description: 'Leadership positions'
  },
  {
    value: '100%',
    label: 'Success Rate',
    description: 'Client satisfaction'
  }
]);

// Methods
const handleNavigation = (path: string) => {
  router.push(path);
};

const handleServiceDetails = () => {
  // Navigate to services page - the services page should handle highlighting the specific service
  router.push('/services');
};

const handleContact = () => {
  router.push('/contact');
};

const handleViewAllServices = () => {
  router.push('/services');
};

const handleViewServices = () => {
  router.push('/services');
};

// Lifecycle
onMounted(async () => {
  try {
    // Load services data using business logic
    servicesData.value = getAllServices();
    
    console.log('Home page loaded successfully');
  } catch (error) {
    console.error('Error loading home page data:', error);
  }
});
</script>