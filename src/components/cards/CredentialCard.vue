<template>
  <div class="text-center">
    <div :class="`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`">
      <component :is="icon" :class="`w-6 h-6 ${iconColor}`" />
    </div>
    <h4 :class="`font-semibold ${titleColor} mb-2`">{{ title }}</h4>
    <p :class="`text-sm ${descriptionColor}`">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  icon: Component;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  titleColor?: string;
  descriptionColor?: string;
}

withDefaults(defineProps<Props>(), {
  titleColor: 'text-slate-900',
  descriptionColor: 'text-slate-600',
});
</script>