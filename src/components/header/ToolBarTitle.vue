<template>
  <v-toolbar-title class="text-h6 font-weight-bold text-truncate">
    <span class="d-none d-sm-inline">Simple ATS</span>
    <span class="d-inline d-sm-none">ATS</span>
  </v-toolbar-title>
</template>

<script setup lang="ts">
// Modern Vue 3 Composition API
</script>

<style scoped>
.v-toolbar-title {
  max-width: 200px;
}

@media (max-width: 600px) {
  .v-toolbar-title {
    max-width: 100px;
    font-size: 1.1rem !important;
  }
}
</style>
