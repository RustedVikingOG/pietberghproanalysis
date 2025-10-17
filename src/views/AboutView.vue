<template>
  <div class="min-h-screen">

    <div class="h-10"></div>

    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-slate-600">Loading about content...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-slate-900 mb-2">Failed to Load Content</h2>
        <p class="text-slate-600 mb-4">{{ error }}</p>
        <button
          @click="refreshContent"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Main content -->
    <main v-else-if="isDataLoaded">
      <!-- Hero Section -->
      <AboutHero
        :introduction="introduction"
        :stats="professionalStats"
      />

      <!-- Journey Timeline Section -->
      <JourneyTimeline
        :journey-phases="journeyPhases"
      />

      <!-- Core Values Section -->
      <CoreValues
        :core-values="coreValues"
      />

      <!-- #################### -->
      <!-- Achievements Section -->
      <!-- #################### -->
      <AchievementsLayout
        title="Professional Achievements"
        description="A distinguished record of excellence spanning over three decades of dedicated service and professional growth"
      >
        <!-- Achievements grid -->
        <template #achievements-grid>
          <CardLayout
            :class="'grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'"
          >
            <AchievementCard
              v-for="achievement in achievementsData"
              :key="achievement.id"
              :achievement="achievement"
              :category="getAchievementCategory(achievement)"
            />
          </CardLayout>
        </template>

        <!-- Credentials integration -->
        <template #credentials-list>
          <CredentialsCardLayout>
            <CredentialCard
              v-for="credential in getCredentialsWithIcons()"
              :key="credential.title"
              :icon="credential.iconComponent"
              :title="credential.title"
              :description="credential.description"
              :bg-color="credential.bgColor"
              :icon-color="credential.iconColor"
            />
          </CredentialsCardLayout>
        </template>

        <!-- Statistics summary -->
        <template #statistics-summary>
          <CardLayout
            :class="'mt-12 grid grid-cols-2 md:grid-cols-4 gap-6'"
          >
            <StatCard
              v-for="stat in stats"
              :key="stat.id"
              :value="stat.value"
              :label="stat.label"
              :container-class="`text-center p-4 bg-white rounded-lg shadow-md`"
              :value-class="`text-2xl font-bold ${stat.color}`"
              :label-class="`text-sm text-slate-600`"
            />
          </CardLayout>
        </template>
      </AchievementsLayout>

      <!-- Professional Association Section -->
      <ProfessionalAssociation
        :professional-association="professionalAssociation"
        @learn-more="handleAssociationLearnMore"
      />
    </main>

    <!-- Navigation assistance -->
    <!-- <nav 
      v-if="isDataLoaded"
      class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div class="bg-white rounded-lg shadow-lg border border-slate-200 p-2 space-y-2">
        <button
          v-for="section in navigationSections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          :class="[
            'block w-3 h-3 rounded-full transition-all duration-200',
            activeSection === section.id ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
          ]"
          :title="section.label"
        />
      </div>
    </nav> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

import AboutHero from '@/components/AboutHero.vue';
import JourneyTimeline from '@/components/JourneyTimeline.vue';
import CoreValues from '@/components/CoreValues.vue';
import CredentialsCardLayout from '@/components/layouts/CredentialsCardLayout.vue';
import CredentialCard from '@/components/cards/CredentialCard.vue';
import CardLayout from '@/components/layouts/CardLayout.vue';
import StatCard from '@/components/cards/StatCard.vue';
import AchievementCard from '@/components/cards/AchievementCard.vue';
import AchievementsLayout from '@/components/layouts/AchievementsLayout.vue';
import ProfessionalAssociation from '@/components/ProfessionalAssociation.vue';

import { useAchievementCredentials } from '@/composables/achievements/useAchievementCredential';
import { useAchievementStats } from '@/composables/achievements/useAchievementStats';
import { useAchievementsGeneral } from '@/composables/achievements/useAchievementsGeneral';
import { useAboutContent } from '@/composables/useAboutContent';

// Router for navigation
const router = useRouter();

// Composables
const {
  loading,
  error,
  isDataLoaded,
  professionalStats,
  journeyPhases,
  coreValues,
  introduction,
  professionalAssociation,
  fetchAboutData,
  refreshContent
} = useAboutContent();

const { getCredentialsWithIcons } = useAchievementCredentials();
const { getStatsA } = useAchievementStats();
const { getAchievements, getAchievementCategory } = useAchievementsGeneral();

const stats = getStatsA();
const achievementsData = getAchievements();

/**
 * Handle learn more from professional association
 */
const handleAssociationLearnMore = (): void => {
  // Navigate to contact page for AEASA membership inquiries
  router.push('/contact?inquiry=aeasa');
};

// Lifecycle
onMounted(async () => {
  await fetchAboutData();
  
  // Setup section observer after content loads
  await nextTick();
});
</script>