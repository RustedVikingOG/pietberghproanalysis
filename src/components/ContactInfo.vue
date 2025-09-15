<template>
  <div class="bg-slate-50 rounded-xl p-8">
    <h3 class="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
    
    <div class="space-y-6">
      <!-- Primary Contact -->
      <div>
        <h4 class="text-lg font-semibold text-slate-800 mb-3">Get in Touch</h4>
        <div class="space-y-3">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-slate-700">Email</p>
              <a href="mailto:pietbergh.proanalysis@gmail.com" class="text-blue-600 hover:text-blue-700 transition-colors">
              pietbergh.proanalysis@gmail.com
              </a>
            </div>
          </div>

          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-slate-700">Location</p>
              <p class="text-slate-600">Cape Town, South Africa</p>
            </div>
          </div>

          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p class="text-sm font-medium text-slate-700">Phone</p>
              <a href="tel:+27711818582" class="text-blue-600 hover:text-blue-700 transition-colors">
              +27 71 181 8582
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Hours -->
      <div>
        <h4 class="text-lg font-semibold text-slate-800 mb-3">Business Hours</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-600">Monday - Friday</span>
            <span class="text-slate-800 font-medium">8:00 AM - 5:00 PM</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Saturday</span>
            <span class="text-slate-800 font-medium">9:00 AM - 1:00 PM</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">Sunday</span>
            <span class="text-slate-800 font-medium">Closed</span>
          </div>
          <p class="text-sm text-slate-500 mt-3">
            Response time: Within 24 hours during business days
          </p>
        </div>
      </div>

      <!-- Services Offered -->
      <div>
        <h4 class="text-lg font-semibold text-slate-800 mb-3">Services Available</h4>
        <div class="space-y-2">
          <div class="flex items-center">
            <svg class="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-slate-700">Business Process Analysis</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-slate-700">Strategic Consulting</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-slate-700">Operational Excellence</span>
          </div>
          <div class="flex items-center">
            <svg class="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-slate-700">Performance Optimization</span>
          </div>
        </div>
      </div>

      <!-- Professional Note -->
      <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
        <div class="flex">
          <svg class="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
          <div>
            <p class="text-sm font-medium text-blue-800 mb-1">Professional Consultation</p>
            <p class="text-sm text-blue-700">
              Free initial consultation available to discuss your business needs and determine how we can help optimize your operations.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="pt-4 border-t border-slate-200">
        <p class="text-sm text-slate-600 mb-3">
          Ready to optimize your business processes? Get in touch today.
        </p>
        <a 
          href="mailto:pietbergh.proanalysis@gmail.com?subject=Business Consultation Inquiry"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Quick Email
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ContactInfo Component - Displays business contact information and details
 * Purely presentational component with static contact information
 */
</script>