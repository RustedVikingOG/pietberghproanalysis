<template>
  <section id="association" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Professional Association
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          Committed to maintaining the highest professional standards through active membership and continuous engagement
        </p>
      </div>

      <!-- Association highlight -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-12 rounded-2xl border border-blue-200 shadow-lg">
          <div class="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
            
            <!-- Association logo/icon -->
            <div class="flex-shrink-0">
              <div class="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-200">
                <!-- AEASA logo placeholder -->
                <div class="text-blue-600 font-bold text-lg lg:text-xl text-center">
                  <div>AEASA</div>
                  <div class="text-xs text-blue-500 mt-1">Member</div>
                </div>
              </div>
            </div>

            <!-- Association information -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                Association for Evidence Analysts South Africa
              </h3>
              
              <p class="text-lg text-slate-700 mb-4 leading-relaxed">
                {{ professionalAssociation }}
              </p>

              <!-- Membership benefits -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-slate-700 font-medium">Professional Standards</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-slate-700 font-medium">Continuous Education</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-slate-700 font-medium">Industry Networking</span>
                </div>

                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="text-slate-700 font-medium">Ethical Compliance</span>
                </div>
              </div>

              <!-- Call to action -->
              <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  @click="learnMoreAboutMembership"
                  class="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-medium rounded-lg border border-blue-200 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Learn About Membership
                  <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional context -->
      <div class="mt-12 text-center">
        <div class="max-w-3xl mx-auto bg-slate-50 p-8 rounded-xl border border-slate-200">
          <h4 class="text-xl font-semibold text-slate-900 mb-4">
            Commitment to Professional Excellence
          </h4>
          <p class="text-slate-700 leading-relaxed">
            Membership in AEASA demonstrates a commitment to maintaining the highest standards of professional practice 
            in evidence analysis. This association ensures that members stay current with best practices, ethical guidelines, 
            and emerging methodologies in the field of forensic and investigative analysis.
          </p>
        </div>
      </div>

      <!-- Membership benefits detail -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(benefit, index) in membershipBenefits"
          :key="index"
          class="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-100"
        >
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <component :is="benefit.icon" class="w-6 h-6 text-blue-600" />
          </div>
          
          <h5 class="font-semibold text-slate-900 mb-2">
            {{ benefit.title }}
          </h5>
          
          <p class="text-sm text-slate-600">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  professionalAssociation: string;
}

defineProps<Props>();

const emit = defineEmits<{
  learnMore: [];
}>();

// Membership benefits data
const membershipBenefits = [
  {
    title: 'Professional Credibility',
    description: 'Enhanced professional standing and recognition in the industry',
    icon: 'div' // Would be star icon component
  },
  {
    title: 'Continuous Learning',
    description: 'Access to training programs and professional development opportunities',
    icon: 'div' // Would be academic-cap icon component
  },
  {
    title: 'Industry Standards',
    description: 'Adherence to the latest industry standards and best practices',
    icon: 'div' // Would be clipboard-check icon component
  },
  {
    title: 'Peer Network',
    description: 'Connection with a community of professional evidence analysts',
    icon: 'div' // Would be users icon component
  }
];

/**
 * Handle learn more about membership action
 */
const learnMoreAboutMembership = (): void => {
  emit('learnMore');
};
</script>