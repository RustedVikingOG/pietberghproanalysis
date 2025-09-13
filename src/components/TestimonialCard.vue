<template>
  <div class="card bg-white shadow-md rounded-lg p-6">
    <div class="flex items-center space-x-4">
      <img v-if="testimonial.imageUrl" :src="testimonial.imageUrl" alt="Photo of {{ testimonial.name }}" class="w-16 h-16 rounded-full" />
      <div>
        <h3 class="text-lg font-semibold">{{ testimonial.name }}</h3>
        <p class="text-sm text-slate-500">{{ testimonial.title }}</p>
      </div>
    </div>
    <p class="mt-4 text-slate-600">{{ testimonial.message }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Testimonial } from '@/models/Testimonial';

defineProps<{ testimonial: Testimonial }>();
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
</style>