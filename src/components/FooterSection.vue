<template>
  <footer class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
      <svg class="absolute bottom-0 right-0 w-96 h-96 transform translate-x-32 translate-y-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Main Footer Content -->
    <div class="relative container-section py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Company Info - Enhanced -->
        <div class="lg:col-span-5">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-4 mb-8">
            <div class="relative">
              <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
              <img 
                :src="logoLight" 
                alt="PietBergh ProAnalysis Logo" 
                class="relative w-16 h-16 p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
              />
            </div>
            <div>
              <div class="text-2xl font-bold text-white mb-1">{{ footerContent.companyInfo.name }}</div>
              <div class="text-blue-300 font-medium">{{ footerContent.companyInfo.tagline }}</div>
            </div>
          </div>
          
          <!-- Enhanced Description -->
          <p class="text-slate-300 leading-relaxed mb-8 text-lg max-w-md">
            {{ footerContent.companyInfo.description }}
          </p>
          
          <!-- Professional Credentials - Enhanced -->
          <div class="space-y-4 mb-8">
            <h4 class="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-4">Professional Credentials</h4>
            <div class="grid grid-cols-1 gap-3">
              <div 
                v-for="credential in footerContent.credentials" 
                :key="credential.title"
                class="flex items-center group"
              >
                <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-white font-medium text-sm">{{ credential.title }}</div>
                  <div class="text-slate-400 text-xs">{{ credential.description }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Enhanced Social Links -->
          <div>
            <h4 class="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-4">Connect With Us</h4>
            <div class="flex space-x-4">
              <a
                v-for="social in footerContent.socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.ariaLabel || social.name"
                :target="social.isExternal ? '_blank' : '_self'"
                :rel="social.isExternal ? 'noopener noreferrer' : undefined"
                class="group relative w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-xl flex items-center justify-center border border-white/20 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <svg class="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <!-- LinkedIn -->
                  <path v-if="social.name === 'LinkedIn'" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  <!-- Email -->
                  <path v-else-if="social.name === 'Email'" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  <!-- Phone -->
                  <path v-else-if="social.name === 'Phone'" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <!-- Hover effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Services Section -->
        <div class="lg:col-span-2">
          <h3 class="text-lg font-bold text-white mb-6 relative">
            Services
            <div class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </h3>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.label">
              <router-link
                :to="link.to"
                class="text-slate-300 hover:text-blue-300 transition-colors text-sm flex items-center group"
              >
                <span class="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Quick Links Section -->
        <div class="lg:col-span-2">
          <h3 class="text-lg font-bold text-white mb-6 relative">
            Quick Links
            <div class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.label">
              <router-link
                :to="link.to"
                class="text-slate-300 hover:text-blue-300 transition-colors text-sm flex items-center group"
              >
                <span class="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></span>
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact Section - Enhanced -->
        <div class="lg:col-span-3">
          <h3 class="text-lg font-bold text-white mb-6 relative">
            Get in Touch
            <div class="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </h3>
          <div class="space-y-4">
            <div 
              v-for="contact in footerContent.contactDetails" 
              :key="contact.type"
              class="group"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                  <svg class="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <!-- Email Icon -->
                    <path v-if="contact.type === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    <!-- Phone Icon -->
                    <path v-else-if="contact.type === 'phone'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    <!-- Location Icon -->
                    <path v-else-if="contact.type === 'location'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-blue-300 mb-1">{{ contact.label }}</div>
                  <a 
                    v-if="contact.href" 
                    :href="contact.href" 
                    class="text-white hover:text-blue-300 transition-colors font-medium"
                  >
                    {{ contact.value }}
                  </a>
                  <div v-else class="text-white font-medium">{{ contact.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <div class="text-blue-300 font-semibold text-sm mb-1">Professional Consultation</div>
                <p class="text-slate-300 text-xs leading-relaxed">
                  Free initial consultation available to discuss your business needs and determine how we can help optimize your operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Bottom Footer -->
    <div class="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div class="container-section py-8">
        <div class="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <!-- Copyright -->
          <div class="text-sm text-slate-400 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            © {{ currentYear }} {{ footerContent.companyInfo.name }}. All rights reserved.
          </div>
          
          <!-- Legal Links -->
          <div class="flex flex-wrap justify-center space-x-8">
            <button
              v-for="link in legalLinkActions"
              :key="link.label"
              @click="link.action"
              class="text-sm text-slate-400 hover:text-blue-300 transition-colors relative group cursor-pointer"
            >
              {{ link.label }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>
          
          <!-- Professional Tagline -->
          <div class="text-sm text-blue-300 italic font-medium">
            "{{ footerContent.professionalTagline }}"
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay Modal for Legal Content -->
    <OverlayModal
      :is-open="modalController.isOpen.value"
      :title="modalController.currentContent.value?.title || ''"
      :icon="modalController.currentContent.value?.icon"
      :max-width="'3xl'"
      @close="modalController.closeModal"
    >
      <div v-if="modalController.currentContent.value" class="space-y-6">
        <!-- Last Updated -->
        <div class="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <strong>Last Updated:</strong> {{ modalController.currentContent.value.lastUpdated }}
        </div>

        <!-- Content Sections -->
        <div 
          v-for="section in modalController.currentContent.value.sections"
          :key="section.heading"
          class="space-y-3"
        >
          <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            {{ section.heading }}
          </h3>
          <div class="space-y-2">
            <p 
              v-for="(paragraph, index) in section.content"
              :key="index"
              class="text-gray-700 leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </div>
          
          <!-- Subsections if any -->
          <template v-if="section.subsections">
            <div 
              v-for="subsection in section.subsections"
              :key="subsection.heading"
              class="ml-4 space-y-2"
            >
              <h4 class="text-md font-medium text-gray-800">
                {{ subsection.heading }}
              </h4>
              <div class="space-y-1">
                <p 
                  v-for="(paragraph, subIndex) in subsection.content"
                  :key="subIndex"
                  class="text-gray-600 leading-relaxed text-sm"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Contact Information -->
        <div 
          v-if="modalController.currentContent.value.contactInfo"
          class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400"
        >
          <h4 class="font-semibold text-blue-900 mb-2">Contact Us</h4>
          <p class="text-blue-800 text-sm">
            For questions regarding this {{ modalController.currentContent.value.title.toLowerCase() }}, please contact us at:
          </p>
          <div class="mt-2 space-y-1">
            <p class="text-blue-800 font-medium">
              📧 {{ modalController.currentContent.value.contactInfo.email }}
            </p>
            <p 
              v-if="modalController.currentContent.value.contactInfo.phone"
              class="text-blue-800 font-medium"
            >
              📞 {{ modalController.currentContent.value.contactInfo.phone }}
            </p>
          </div>
        </div>
      </div>
    </OverlayModal>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import logoLight from '@/assets/logo-light.svg';
import OverlayModal from '@/components/OverlayModal.vue';
import { ModalController } from '@/controllers/ModalController';
import type { FooterContent } from '@/models/Footer';

// Create modal controller instance
const modalController = new ModalController();

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Footer content with defaults
const footerContent = computed<FooterContent>(() => ({
  companyInfo: {
    name: 'PietBergh ProAnalysis',
    tagline: 'Professional Investigation Services',
    description: 'Distinguished former SAPS Brigadier offering specialized private consulting in investigation, evidence analysis, process reengineering, and linguistic services with 37+ years of professional law enforcement experience.',
    logoUrl: logoLight
  },
  credentials: [
    {
      title: 'Former SAPS Brigadier',
      description: 'South African Police Service',
      verified: true
    },
    {
      title: '37+ Years Experience',
      description: 'Law Enforcement & Investigation',
      verified: true
    },
    {
      title: 'Licensed Private Investigator',
      description: 'Professional Certification',
      verified: true
    }
  ],
  contactDetails: [
    {
      type: 'email',
      label: 'Email',
      value: 'pietbergh.proanalysis@gmail.com',
      href: 'mailto:pietbergh.proanalysis@gmail.com'
    },
    {
      type: 'phone',
      label: 'Phone',
      value: '+27 12 345 6789',
      href: 'tel:+27123456789'
    },
    {
      type: 'location',
      label: 'Location',
      value: 'Cape Town, South Africa'
    }
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/pietbergh-proanalysis',
      icon: 'linkedin',
      ariaLabel: 'Visit our LinkedIn profile',
      isExternal: true
    },
    {
      name: 'Email',
      url: 'mailto:pietbergh.proanalysis@gmail.com',
      icon: 'email',
      ariaLabel: 'Send us an email',
      isExternal: false
    },
    {
      name: 'Phone',
      url: 'tel:+27123456789',
      icon: 'phone',
      ariaLabel: 'Call us',
      isExternal: false
    }
  ],
  navigationSections: [],
  legalLinks: [
    { label: 'Privacy Policy', to: '/contact#privacy' },
    { label: 'Terms of Service', to: '/contact#terms' },
    { label: 'Professional Standards', to: '/about#standards' }
  ],
  copyrightText: `© ${new Date().getFullYear()} PietBergh ProAnalysis. All rights reserved.`,
  professionalTagline: 'Meticulous Service for Impeccable Results'
}));

// Navigation Links
const serviceLinks = [
  { label: 'Evidence Analysis', to: '/services#evidence-analysis' },
  { label: 'Process Reengineering', to: '/services#process-reengineering' },
  { label: 'Editing & Translation', to: '/services#editing-translation' },
  { label: 'Success Stories', to: '/portfolio#portfolio-cases' },
  { label: 'Consultation', to: '/contact' }
];

const quickLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' }
];

// Legal link actions for modal
const legalLinkActions = [
  { 
    label: 'Privacy Policy', 
    action: () => modalController.openPrivacyPolicy() 
  },
  { 
    label: 'Terms of Service', 
    action: () => modalController.openTermsOfService() 
  },
  { 
    label: 'Professional Standards', 
    action: () => modalController.openProfessionalStandards() 
  }
];
</script>