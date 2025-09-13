<template>
  <section id="achievements" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Professional Achievements
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          A distinguished record of excellence spanning over three decades of dedicated service and professional growth
        </p>
      </div>

      <!-- Achievements grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200"
        >
          <!-- Achievement icon -->
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
          </div>

          <!-- Achievement content -->
          <div class="flex-1">
            <p class="text-slate-800 font-medium leading-relaxed">
              {{ achievement }}
            </p>
            
            <!-- Achievement category badge -->
            <div class="mt-3">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getAchievementCategory(achievement).class"
              >
                {{ getAchievementCategory(achievement).label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Credentials integration -->
      <div v-if="showCredentials" class="mt-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-slate-900 mb-3">
            Professional Credentials
          </h3>
          <p class="text-slate-600">
            Formal qualifications and continuing professional development
          </p>
        </div>

        <!-- Credentials summary -->
        <div class="bg-white p-8 rounded-xl shadow-md border border-slate-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Academic credentials -->
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7m14 0v7a2 2 0 002 2h5a2 2 0 002-2v-7"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Academic Excellence</h4>
              <p class="text-sm text-slate-600">MA in African Languages with scholarly credentials</p>
            </div>

            <!-- Professional training -->
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Professional Training</h4>
              <p class="text-sm text-slate-600">Specialized law enforcement and analytical training</p>
            </div>

            <!-- Continuous development -->
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-slate-900 mb-2">Advanced Tools</h4>
              <p class="text-sm text-slate-600">Proficiency in cutting-edge analytical tools and methodologies</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics summary -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center p-4 bg-white rounded-lg shadow-md">
          <div class="text-2xl font-bold text-blue-600">37+</div>
          <div class="text-sm text-slate-600">Years Service</div>
        </div>
        
        <div class="text-center p-4 bg-white rounded-lg shadow-md">
          <div class="text-2xl font-bold text-amber-600">26</div>
          <div class="text-sm text-slate-600">Cases Analyzed</div>
        </div>
        
        <div class="text-center p-4 bg-white rounded-lg shadow-md">
          <div class="text-2xl font-bold text-green-600">18</div>
          <div class="text-sm text-slate-600">Years in Management</div>
        </div>
        
        <div class="text-center p-4 bg-white rounded-lg shadow-md">
          <div class="text-2xl font-bold text-purple-600">100%</div>
          <div class="text-sm text-slate-600">Unblemished Record</div>
        </div>
      </div>

      <!-- Call to action -->
      <!-- <div class="mt-12 text-center">
        <button
          @click="viewCredentials"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          View Full Credentials
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  achievements: string[];
  showCredentials?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  viewCredentials: [];
}>();

/**
 * Categorize achievement for styling and labeling
 */
const getAchievementCategory = (achievement: string): { label: string; class: string } => {
  const lower = achievement.toLowerCase();
  
  if (lower.includes('service') || lower.includes('years')) {
    return {
      label: 'Service Record',
      class: 'bg-blue-100 text-blue-800'
    };
  }
  
  if (lower.includes('commander') || lower.includes('brigadier') || lower.includes('rank')) {
    return {
      label: 'Leadership',
      class: 'bg-purple-100 text-purple-800'
    };
  }
  
  if (lower.includes('cases') || lower.includes('analyzed')) {
    return {
      label: 'Casework',
      class: 'bg-amber-100 text-amber-800'
    };
  }
  
  if (lower.includes('ma') || lower.includes('languages') || lower.includes('academic')) {
    return {
      label: 'Academic',
      class: 'bg-green-100 text-green-800'
    };
  }
  
  if (lower.includes('tools') || lower.includes('analytical') || lower.includes('proficiency')) {
    return {
      label: 'Technical',
      class: 'bg-indigo-100 text-indigo-800'
    };
  }
  
  return {
    label: 'Professional',
    class: 'bg-slate-100 text-slate-800'
  };
};

/**
 * Handle view credentials action
 */
const viewCredentials = (): void => {
  emit('viewCredentials');
};
</script>