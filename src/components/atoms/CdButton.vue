<template>
  <v-btn variant="outlined" class="mt-3" style="text-transform: none">{{ text }}</v-btn>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
