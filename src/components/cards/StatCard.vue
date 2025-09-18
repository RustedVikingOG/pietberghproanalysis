<template>
  <div :class="containerClass">
    <div :class="valueClass">
        {{ value }}
    </div>
    <div :class="labelClass">
        {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string;
  label: string;
  containerClass: string;
  valueClass: string;
  labelClass: string;
}

defineProps<Props>();
</script>
