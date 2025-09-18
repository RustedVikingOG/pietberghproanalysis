<template>
  <div class="mt-16">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-slate-900 mb-3">
        Professional Credentials
      </h3>
      <p class="text-slate-600">
        Formal qualifications and continuing professional development
      </p>
    </div>

    <!-- Credentials summary -->
    <div class="bg-white p-8 rounded-xl shadow-md border border-slate-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Credentials list
</script>
