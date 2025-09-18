<template>
  <div class="card bg-white shadow-md rounded-lg p-6">
    <div class="flex items-center space-x-4 mb-4">
      <img :src="randomAvatarUrl" :alt="`Avatar for ${testimonial.name}`" class="w-16 h-16 rounded-full" />
      <div class="flex-1">
        <h3 class="text-lg font-semibold">{{ testimonial.name }}</h3>
        <p class="text-sm text-slate-500">{{ testimonial.title }}</p>
      </div>
    </div>
    <a v-if="testimonial.pdfUrl" :href="testimonial.pdfUrl" target="_blank" rel="noopener noreferrer" 
         class="btn-secondary text-sm px-3 py-1 inline-flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span>{{ testimonial.pdfTitle || 'Download PDF' }}</span>
      </a>
    <p class="mt-4 text-slate-600">{{ testimonial.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Testimonial } from '@/models/Testimonial';

const props = defineProps<{ testimonial: Testimonial }>();

// Generate random avatar URL using DiceBear API
const randomAvatarUrl = computed(() => {
  // Use testimonial ID or name to create consistent but varied avatars
  const seed = props.testimonial.id || props.testimonial.name;
  // Use different avatar styles randomly
  const styles = ['avataaars', 'initials', 'bottts', 'identicon'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(seed)}`;
});
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-4px);
}
</style>