<template>
  <label>
    {{ label }}
    <span v-if="required" class="required-indicator">*</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ label: string; required?: boolean }>()
</script>

<style>
.required-indicator {
  color: #d32f2f;
}
</style>
