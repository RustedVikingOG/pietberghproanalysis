<template>
  <div class="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-slate-200">
    <!-- Achievement icon -->
    <div class="flex-shrink-0">
      <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
        <Star class="w-6 h-6 text-amber-600" />
      </div>
    </div>

    <!-- Achievement content -->
    <div class="flex-1">
      <p class="text-slate-800 font-medium leading-relaxed">
        {{ achievement.description }}
      </p>

      <!-- Achievement category badge -->
      <div class="mt-3">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="category.class"
        >
          {{ category.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { Achievement } from '@/models/achievements/Achievement';

interface Props {
  achievement: Achievement;
  category: { label: string; class: string };
}

defineProps<Props>();
</script>