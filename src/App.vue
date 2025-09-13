<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- Navigation Header -->
    <NavigationBar />

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
              <li>
                <router-link
                  to="/"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </router-link>
              </li>
              <li>
                <router-link
                  to="/about"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  About
                </router-link>
              </li>
              <li>
                <router-link
                  to="/services"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  Services
                </router-link>
              </li>
              <li>
                <router-link
                  to="/portfolio"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  Portfolio
                </router-link>
              </li>
              <li>
                <router-link
                  to="/testimonials"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  Testimonials
                </router-link>
              </li>
              <li>
                <router-link
                  to="/contact"
                  class="text-slate-300 hover:text-white transition-colors"
                >
                  Contact
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
import { computed } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())
</script>