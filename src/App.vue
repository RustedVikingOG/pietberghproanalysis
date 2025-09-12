<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- Navigation Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav class="container-section">
        <div class="flex-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <router-link to="/" class="text-xl font-bold text-primary-600">
              PietBergh ProAnalysis
            </router-link>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="page in navigation"
                :key="page.path"
                :to="page.path"
                class="link-hover text-slate-600 px-3 py-2 rounded-md text-sm font-medium"
                :class="{ 'text-primary-600 bg-primary-50': $route.path === page.path }"
              >
                {{ page.name }}
              </router-link>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-slate-600 hover:text-primary-600 p-2"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <router-link
              v-for="page in navigation"
              :key="page.path"
              :to="page.path"
              @click="mobileMenuOpen = false"
              class="text-slate-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              :class="{ 'text-primary-600 bg-primary-50': $route.path === page.path }"
            >
              {{ page.name }}
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white">
      <div class="container-section py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-lg font-semibold mb-4">PietBergh ProAnalysis</h3>
            <p class="text-slate-300 mb-4">
              Professional business analysis and consulting services with proven results.
              Helping organizations optimize their operations and achieve strategic goals.
            </p>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-md font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li v-for="page in navigation" :key="page.path">
                <router-link
                  :to="page.path"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  {{ page.name }}
                </router-link>
              </li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h4 class="text-md font-semibold mb-4">Contact</h4>
            <div class="space-y-2 text-slate-300">
              <p>Email: info@pietberghproanalysis.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>&copy; {{ currentYear }} PietBergh ProAnalysis. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Navigation state
const mobileMenuOpen = ref(false)

// Navigation menu items
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
]

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())
</script>