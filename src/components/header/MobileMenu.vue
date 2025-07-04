<template>
  <v-app-bar-nav-icon
    @click="$emit('toggle-drawer')"
  ></v-app-bar-nav-icon>
</template>

<script setup lang="ts">
defineEmits<{
  'toggle-drawer': []
}>()
</script>
