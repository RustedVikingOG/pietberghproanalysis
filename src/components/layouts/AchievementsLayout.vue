<template>
  <section id="achievements" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          {{ description }}
        </p>
      </div>

      <!-- Achievements grid -->
      <slot name="achievements-grid"></slot>

      <!-- Credentials integration -->
      <slot name="credentials-list"></slot>

      <!-- Statistics summary -->
      <slot name="statistics-summary"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}
defineProps<Props>();
</script>