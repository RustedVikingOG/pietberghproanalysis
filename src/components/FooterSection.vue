<template>
  <footer class="bg-slate-900 text-white">
    <!-- Main Footer Content -->
    <div class="container-section py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <!-- Logo and Brand -->
          <div class="flex items-center space-x-3 mb-6">
            <img 
              :src="logoLight" 
              alt="PietBergh ProAnalysis Logo" 
              class="w-12 h-12"
            />
            <div>
              <div class="text-xl font-bold">PietBergh ProAnalysis</div>
              <div class="text-sm text-slate-400">Professional Investigation Services</div>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-slate-300 leading-relaxed mb-6 max-w-md">
            {{ props.companyDescription }}
          </p>
          
          <!-- Professional Credentials -->
          <div class="space-y-2 mb-6">
            <div class="flex items-center text-secondary-400">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">Former SAPS Brigadier</span>
            </div>
            <div class="flex items-center text-secondary-400">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">37+ Years Law Enforcement Experience</span>
            </div>
            <div class="flex items-center text-secondary-400">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">Licensed Private Investigator</span>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="icon-social"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <!-- LinkedIn -->
                <path v-if="social.name === 'LinkedIn'" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                <!-- Email -->
                <path v-else-if="social.name === 'Email'" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                <!-- Phone -->
                <path v-else-if="social.name === 'Phone'" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-6">Services</h3>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.label">
              <router-link
                :to="link.to"
                class="text-slate-300 hover:text-secondary-400 transition-colors text-sm"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-6">Get in Touch</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <div>
                <div class="text-sm text-slate-300">Email</div>
                <a href="mailto:pietbergh.proanalysis@gmail.com" class="text-secondary-400 hover:text-secondary-300 transition-colors">
                  pietbergh.proanalysis@gmail.com
                </a>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <div>
                <div class="text-sm text-slate-300">Phone</div>
                <a href="tel:+27123456789" class="text-secondary-400 hover:text-secondary-300 transition-colors">
                  +27 12 345 6789
                </a>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <svg class="w-5 h-5 text-secondary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <div class="text-sm text-slate-300">Location</div>
                <div class="text-secondary-400">
                  Cape Town, South Africa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Footer -->
    <div class="border-t border-slate-800">
      <div class="container-section py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <div class="text-sm text-slate-400">
            © {{ currentYear }} PietBergh ProAnalysis. All rights reserved.
          </div>
          
          <!-- Legal Links -->
          <div class="flex space-x-6">
            <router-link
              v-for="link in legalLinks"
              :key="link.label"
              :to="link.to"
              class="text-sm text-slate-400 hover:text-secondary-400 transition-colors"
            >
              {{ link.label }}
            </router-link>
          </div>
          
          <!-- Professional Tagline -->
          <div class="text-sm text-slate-400 italic">
            "Meticulous Service for Impeccable Results"
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import logoLight from '@/assets/logo-light.svg';

// Props
interface Props {
  companyDescription?: string;
}

const props = withDefaults(defineProps<Props>(), {
  companyDescription: 'Distinguished former SAPS Brigadier offering specialized private consulting in investigation, evidence analysis, process reengineering, and linguistic services with 37+ years of professional law enforcement experience.'
});

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Navigation Links
const serviceLinks = [
  { label: 'Evidence Analysis', to: '/services/evidence-analysis' },
  { label: 'Process Reengineering', to: '/services/process-reengineering' },
  { label: 'Editing & Translation', to: '/services/editing-translation' },
  { label: 'Success Stories', to: '/success-stories' },
  { label: 'Consultation', to: '/contact' }
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Professional Standards', to: '/standards' }
];

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/piet-bergh',
    icon: 'linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:pietbergh.proanalysis@gmail.com',
    icon: 'email'
  },
  {
    name: 'Phone',
    url: 'tel:+27123456789',
    icon: 'phone'
  }
];
</script>