<template>
  <div id="app" class="min-h-screen bg-white">
    <!-- Navigation Header -->
    <NavigationBar />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>