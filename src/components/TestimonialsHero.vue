<template>
  <section class="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-20">
    <!-- Trust Pattern Background -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3b82f6 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <div class="relative container-section">
      <div class="max-w-6xl mx-auto">
        
        <!-- Header Section -->
        <div class="text-center mb-16">
          <!-- Trust Badge -->
          <div class="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Trusted by Legal Professionals
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            <span class="block">Client</span>
            <span class="block text-blue-600">Testimonials</span>
          </h1>

          <p class="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Hear directly from legal professionals, law enforcement agencies, and clients who have 
            experienced our meticulous investigation and analysis services.
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <!-- Left: Trust Metrics -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h3 class="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Trust Metrics
              </h3>

              <div class="space-y-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">{{ testimonialStats.clientSatisfaction }}</div>
                  <div class="text-sm text-slate-600 font-medium">Client Satisfaction</div>
                </div>

                <div class="text-center">
                  <div class="flex items-center justify-center mb-2">
                    <div class="flex space-x-1">
                      <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </div>
                  <div class="text-3xl font-bold text-blue-600">{{ testimonialStats.averageRating }}</div>
                  <div class="text-sm text-slate-600 font-medium">Average Rating</div>
                </div>

                <div class="text-center">
                  <div class="text-3xl font-bold text-blue-600 mb-2">{{ testimonialStats.totalTestimonials }}+</div>
                  <div class="text-sm text-slate-600 font-medium">Client Reviews</div>
                </div>

                <!-- Trust Indicators -->
                <div class="pt-4 border-t border-slate-200">
                  <div class="space-y-3">
                    <div class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      Court-Proven Results
                    </div>
                    <div class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      37+ Years Experience
                    </div>
                    <div class="flex items-center text-sm text-slate-600">
                      <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      AEASA Member
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Center: Featured Testimonial -->
          <div class="lg:col-span-2">
            <div v-if="featuredTestimonial" class="bg-white rounded-xl shadow-lg border border-slate-200 p-8 relative">
              <!-- Quote Icon -->
              <div class="absolute -top-4 left-8 bg-blue-600 text-white p-3 rounded-full">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              <div class="pt-6">
                <blockquote class="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 italic">
                  "{{ featuredTestimonial.message }}"
                </blockquote>

                <div class="flex items-center">
                  <div v-if="featuredTestimonial.imageUrl" class="w-12 h-12 rounded-full bg-slate-200 mr-4 overflow-hidden">
                    <img :src="featuredTestimonial.imageUrl" :alt="featuredTestimonial.name" class="w-full h-full object-cover"/>
                  </div>
                  <div v-else class="w-12 h-12 rounded-full bg-blue-100 mr-4 flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-slate-900">{{ featuredTestimonial.name }}</div>
                    <div class="text-sm text-slate-600">{{ featuredTestimonial.title }}</div>
                  </div>
                </div>
              </div>

              <!-- Decorative Elements -->
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full opacity-20"></div>
              <div class="absolute top-8 -right-4 w-4 h-4 bg-yellow-400 rounded transform rotate-45"></div>
            </div>

            <!-- No Testimonial Fallback -->
            <div v-else class="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              <div class="text-slate-400 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-slate-900 mb-2">Featured Testimonial</h3>
              <p class="text-slate-600">Loading client testimonial...</p>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 text-center">
              <button 
                @click="$emit('view-all-testimonials')"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 mr-4"
              >
                Read All Testimonials
              </button>
              <button 
                @click="$emit('contact')"
                class="bg-white hover:bg-slate-50 text-blue-600 font-medium py-3 px-8 rounded-lg border border-blue-600 transition-colors duration-200"
              >
                Share Your Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Testimonial } from '@/models/Testimonial';

interface Props {
  featuredTestimonial: Testimonial | null;
  testimonialStats: {
    totalTestimonials: number;
    averageRating: string;
    clientSatisfaction: string;
  };
}

interface Emits {
  (e: 'view-all-testimonials'): void;
  (e: 'contact'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<style scoped>
/* Additional styling if needed */
</style>