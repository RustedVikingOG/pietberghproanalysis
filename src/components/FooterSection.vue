<template>
  <footer class="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden border-t border-secondary-500">
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
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        <!-- Company Info - Enhanced -->
        <div class="lg:col-span-2">
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
                <svg v-if="social.icon === 'linkedin'" class="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <use href="/linkedin.svg?url" x="0" y="0" width="24" height="24" />
                </svg>
                <Mail v-else-if="social.name === 'Email'" class="w-5 h-5 text-slate-300 group-hover:text-white transition-colors"/>
                <Phone v-else-if="social.name === 'Phone'" class="w-5 h-5 text-slate-300 group-hover:text-white transition-colors"/>
                <!-- Hover effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Services Section -->
        <div class="grid grid-rows-1 lg:grid-rows-3 lg:col-span-2">
          <div class="grid grid-cols-1 lg:grid-cols-2 lg:rows-span-2">
            <div class="lg:cols-span-1">
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

            <!-- Contact Section - Enhanced -->
            <div class="lg:cols-span-1 lg:rows-span-2">
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
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400 transition-colors">
                      <!-- Email Icon -->
                      <Mail v-if="contact.type === 'email'" class="w-5 h-5 text-blue-300"/>
                      <!-- Phone Icon -->
                      <Phone v-else-if="contact.type === 'phone'" class="w-5 h-5 text-blue-300"/>
                      <!-- Location Icon -->
                      <MapPin v-else-if="contact.type === 'location'" class="w-5 h-5 text-blue-300"/>
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
            </div>
          </div>

          <!-- Call to Action -->
          <div class="lg:rows-span-1 mt-6">
            <div class="mt-8 p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Info class="w-4 h-4 text-blue-900"/>
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
      :max-width="'3xl'"
      @close="modalController.closeModal"
    >
      <template #icon>
        <ListStart 
          v-if="modalController.currentContent.value?.type === 'terms'" 
          class="w-6 h-6 text-blue-400" 
        />
        <ShieldUser 
          v-else-if="modalController.currentContent.value?.type === 'privacy'" 
          class="w-6 h-6 text-blue-400" 
        />
        <FileBadge 
          v-else 
          class="w-6 h-6 text-blue-400" 
        />
      </template>
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
import {
  FileBadge,
  ListStart,
  ShieldUser,
  Mail,
  Phone,
  MapPin,
  Info
} from 'lucide-vue-next';

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
      value: '+27 71 181 8582',
      href: 'tel:+27711818582'
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
      url: 'tel:+27711818582',
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