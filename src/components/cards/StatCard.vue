<template>
  <div class="text-center p-4 bg-white rounded-lg shadow-md">
    <div :class="`text-2xl font-bold ${color}`">{{ value }}</div>
    <div class="text-sm text-slate-600">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string;
  label: string;
  color: string;
}

defineProps<Props>();
</script>
