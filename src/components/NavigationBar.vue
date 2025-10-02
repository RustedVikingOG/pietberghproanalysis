<template>
  <nav :class="navigationClasses" class="fixed w-full z-50 transition-all duration-300">
    <!-- Background with Blur -->
    <div class="absolute inset-0 bg-glassmorphism"></div>
    
    <!-- Navigation Content -->
    <div class="relative container-section">
      <div class="flex items-center justify-between h-16 lg:h-20">
        
        <!-- Logo Section -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 group"
            @click="handleNavigation('/')"
          >
            <!-- Logo Icon -->
            <div class="relative">
              <img 
                :src="logoDark" 
                alt="PietBergh ProAnalysis Logo" 
                class="w-10 h-10 lg:w-12 lg:h-12"
              />
            </div>
            
            <!-- Brand Text -->
            <div class="hidden sm:block">
              <div class="text-lg lg:text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                PietBergh ProAnalysis
              </div>
              <div class="text-xs lg:text-sm text-slate-600 -mt-1">
                Professional Investigation Services
              </div>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            :class="{
              'nav-link-active': currentPath === item.path,
              'nav-link': currentPath !== item.path
            }"
            @click="handleNavigation(item.path)"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            @click="handleNavigation('/contact')"
            class="btn-cta"
          >
            Get Consultation
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            :class="{ 'text-primary-600': isMobileMenuOpen }"
            class="btn-mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!isMobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-glassmorphism border-b border-slate-200">
        <div class="px-4 py-6 space-y-4">
          <!-- Mobile Navigation Links -->
          <div class="space-y-2">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              :class="{
                'nav-link-mobile-active': currentPath === item.path,
                'nav-link-mobile-inactive': currentPath !== item.path
              }"
              @click="handleMobileNavigation(item.path)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Home Icon -->
                <path v-if="item.icon === 'home'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                <!-- User Icon -->
                <path v-if="item.icon === 'user'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                <!-- Briefcase Icon -->
                <path v-if="item.icon === 'briefcase'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6"/>
                <!-- Star Icon -->
                <path v-if="item.icon === 'star'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                <!-- Mail Icon -->
                <path v-if="item.icon === 'mail'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </div>
          
          <!-- Mobile CTA -->
          <div class="pt-4 border-t border-slate-200">
            <button
              @click="handleMobileNavigation('/contact')"
              class="w-full btn-cta"
            >
              Get Consultation
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import logoDark from '@/assets/logo-dark.svg';

// Router
const router = useRouter();
const route = useRoute();

// Reactive State
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Navigation Items
const navigationItems = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/about', label: 'About', icon: 'user' },
  { path: '/services', label: 'Services', icon: 'briefcase' },
  { path: '/portfolio', label: 'Portfolio', icon: 'star' },
  { path: '/testimonials', label: 'Testimonials', icon: 'star' },
  { path: '/contact', label: 'Contact', icon: 'mail' }
];

// Computed
const currentPath = computed(() => route.path);

const navigationClasses = computed(() => ({
  'bg-white/95 shadow-lg': isScrolled.value,
  'bg-transparent': !isScrolled.value
}));

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleNavigation = (path: string) => {
  router.push(path);
};

const handleMobileNavigation = (path: string) => {
  isMobileMenuOpen.value = false;
  router.push(path);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>