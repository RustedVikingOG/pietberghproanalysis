<template>
  <div :class="props.class">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// Generic card layout container
import { defineProps } from 'vue';
const props = defineProps<{
    class: string;
}>();
</script>
