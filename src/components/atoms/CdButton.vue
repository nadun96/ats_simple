<template>
  <v-btn :type="type" variant="outlined" class="mt-3" style="text-transform: none">{{ text }}</v-btn>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>
