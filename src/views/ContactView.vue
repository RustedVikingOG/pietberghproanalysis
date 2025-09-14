<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">

    <div class="h-10"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
        <p class="text-xl text-slate-600 max-w-3xl mx-auto">
          Ready to optimize your business processes? Get in touch with Piet Bergh ProAnalysis 
          for expert consultation and strategic business solutions.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- Contact Form -->
        <div>
          <ContactForm />
        </div>

        <!-- Contact Information -->
        <div>
          <ContactInfo />
        </div>
      </div>

      <!-- Additional Information -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 class="text-2xl font-bold text-slate-900 mb-4">Why Choose Piet Bergh ProAnalysis?</h3>
          <div class="grid md:grid-cols-3 gap-6 mt-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Proven Expertise</h4>
              <p class="text-slate-600 text-sm">Years of experience in business process optimization and strategic consulting.</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Fast Results</h4>
              <p class="text-slate-600 text-sm">Quick turnaround times with measurable improvements to your business operations.</p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Personalized Service</h4>
              <p class="text-slate-600 text-sm">Tailored solutions designed specifically for your business needs and goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue';
import ContactInfo from '@/components/ContactInfo.vue';

/**
 * ContactView - Main contact page view
 * Purely presentational, using ContactForm and ContactInfo components
 * No business logic - follows MVC separation principles
 */
</script>